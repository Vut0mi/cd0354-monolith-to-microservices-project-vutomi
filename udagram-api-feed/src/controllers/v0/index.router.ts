import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';

const router: Router = Router();

// Mount FeedRouter under /feed
router.use('/feed', FeedRouter);

// Base route
router.get('/', async (req: Request, res: Response) => {
  res.send('V0');
});

export const IndexRouter: Router = router;

