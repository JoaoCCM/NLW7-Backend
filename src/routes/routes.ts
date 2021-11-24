import { Router } from 'express';
import { AuthRoutes } from './AuthRoutes';
import { MessageRoutes } from './MessageRoutes';
import { UserRoutes } from './UserRoutes';

const router = Router();

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/message', MessageRoutes)

export { router }