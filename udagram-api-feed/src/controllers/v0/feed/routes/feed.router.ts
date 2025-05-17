import { Router, Request, Response, NextFunction } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';

const router: Router = Router();

/**
 * Middleware to require JWT auth
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers.' });
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length !== 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = tokenBearer[1];

  jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
    }
    next();
  });
}

/**
 * GET a signed URL to upload a new file
 */
router.get('/signed-url/:fileName', requireAuth, async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    const url = await AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to generate signed URL.' });
  }
});

/**
 * GET all feed items
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });

    const itemsWithUrls = await Promise.all(
      items.rows.map(async (item) => {
        if (item.url) {
          item.url = await AWS.getGetSignedUrl(item.url);
        }
        return item;
      })
    );

    res.send({ count: items.count, rows: itemsWithUrls });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Unable to fetch feed items.' });
  }
});

/**
 * GET a specific feed item
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await FeedItem.findByPk(id);

    if (!item) {
      return res.status(404).send({ message: 'Feed item not found.' });
    }

    if (item.url) {
      item.url = await AWS.getGetSignedUrl(item.url);
    }

    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to retrieve feed item.' });
  }
});

/**
 * POST metadata and create a new feed item
 */
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { caption, url: fileName } = req.body;

  if (!caption) {
    return res.status(400).send({ message: 'Caption is required or malformed.' });
  }

  if (!fileName) {
    return res.status(400).send({ message: 'File URL is required.' });
  }

  try {
    const item = new FeedItem({
      caption,
      url: fileName,
    });

    const savedItem = await item.save();
    savedItem.url = await AWS.getGetSignedUrl(savedItem.url);

    res.status(201).send(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to create feed item.' });
  }
});

export const FeedRouter: Router = router;

