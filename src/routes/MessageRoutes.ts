import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, new MessageController().handle);
router.get("/last/three", new MessageController().listLast3Messages);



export const MessageRoutes: Router = router