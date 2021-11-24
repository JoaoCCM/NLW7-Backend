import { Response, Request } from 'express';
import { AuthUserService } from '../services/AuthUserService';

class AuthUserController {
    async handle(req: Request, res: Response) {
        try {
            const service = new AuthUserService();
            const { code } = req.body;

           const data = await service.execute(code);
           return res.json(data);
        } catch (err) {
            return res.json(err);
        }
    }
}

export { AuthUserController }