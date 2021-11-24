import { io } from "../app";
import prismaClient from "../prisma";

class UserSevice {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.user.findFirst({ where: { id: user_id } });
            return user;
        } catch (e) {
            throw e;
        }
    }
}

export { UserSevice };