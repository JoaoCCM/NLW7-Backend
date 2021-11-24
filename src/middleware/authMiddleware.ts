import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function authMiddleware(req: any, res: Response, next: NextFunction) {
    try {
        const [, token] = req.headers["authorization"].split(" ");
        if (!token) res.status(401).json("Invalid");

        try {
            const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
            req.user = sub;

            return next();
        } catch (e) {
            res.status(403).json("Token invalid!")
        }
    } catch (err) {
        res.status(401).json("Something went wrong");
    }
}