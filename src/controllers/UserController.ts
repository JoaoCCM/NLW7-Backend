import { Response, Request } from 'express';
import { UserSevice } from '../services/UserService';

class UserController {
    async handle(req: any, res: Response) {
        try {
            const service = new UserSevice();

            const user = await service.execute(req.user);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

export { UserController }