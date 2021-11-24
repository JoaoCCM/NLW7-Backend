import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthUserService {
    private url_access_token = "https://github.com/login/oauth/access_token";
    private url_access_git = "https://api.github.com/user";

    async execute(code: string) {
        try {
            const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(`${this.url_access_token}`, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: { "Accept": "application/json" }
            });

            const res = await axios.get<IUserResponse>(`${this.url_access_git}`, { headers: { authorization: `Bearer ${accessTokenResponse.access_token}` } });

            const { login, avatar_url, name, id } = res.data;

            let user = await prismaClient.user.findFirst({ where: { github_id: id } });
            if (!user) user = await prismaClient.user.create({ data: { github_id: id, login, name, avatar_url } });

            const token = sign({ user: { name: user.name, id: user.id, avatar_url: user.avatar_url } }, process.env.JWT_SECRET, { subject: user.id, expiresIn: "1d" });

            return { ...user, token }

        } catch (err) {
            throw err;
        }
    }
}


export { AuthUserService }