import { Response, Request } from 'express';
import { CreateMessageService, ListLast3MessagesService } from '../services/MessageService';

class MessageController {
    async handle(req: any, res: Response) {
        try {
            const service = new CreateMessageService();
            const { message } = req.body;

            await service.execute(message, req.user);
            return res.status(200).json({"message": "Done"});
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async listLast3Messages(req: Request, res: Response) {
        try {
            const service = new ListLast3MessagesService();

            const messages = await service.execute();
            return res.status(200).json(messages);
        } catch (err) {
            return res.status(500).json(err);
        } 
    }
}

export { MessageController }