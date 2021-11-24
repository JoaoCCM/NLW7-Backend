import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get("/profile", authMiddleware, new UserController().handle);

export const UserRoutes: Router = router