import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';

const router: Router = Router();

// Mount UserRouter under /users
router.use('/users', UserRouter);

// Simple base route
router.get('/', async (req: Request, res: Response) => {
  res.send('V0');
});

export const IndexRouter: Router = router;

