import { io } from "../app";
import prismaClient from "../prisma";

class CreateMessageService {
    async execute(text: string, user_id: string) {
        try {
            const message = await prismaClient.message.create({ data: { text, userId: user_id }, include: { user: true } });

            const infoWS = { text: message.text, userId: user_id, created_at: message.created_at, user: { name: message.user.name, avatar: message.user.avatar_url } }
            io.emit("new_message", infoWS);

            return message;
        } catch (e) {
            throw e;
        }
    }
}

class ListLast3MessagesService {
    async execute() {
        try {
            const messages = await prismaClient.message.findMany({ take: 3, orderBy: { created_at: "desc" }, include: { user: true } });

            return messages;
        } catch (e) {
            throw e;
        }
    }
}

export { CreateMessageService, ListLast3MessagesService };