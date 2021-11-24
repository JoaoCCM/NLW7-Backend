import { Router } from 'express';
import { AuthUserController } from '../controllers/AuthUserController';

const router = Router();

router.post('/', new AuthUserController().handle);

export const AuthRoutes: Router = router