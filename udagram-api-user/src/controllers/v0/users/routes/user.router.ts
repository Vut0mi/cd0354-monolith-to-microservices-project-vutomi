import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

// Optional base route handler
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

// Get a user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.status(200).send(user);
});

export const UserRouter: Router = router;

