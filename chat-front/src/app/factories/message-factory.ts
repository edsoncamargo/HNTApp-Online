import { Message } from './../models/message';
import { MessageType } from './../models/enums/message-type';
import { User } from '../models/user';
import { WebsocketChatService } from './../services/websocket-chat/websocket-chat.service';

export class MessageFactory {

    static createMessageByType(message: string, service: WebsocketChatService): any {
        const body = JSON.parse(message);
        if (body.type === MessageType.MESSAGE) {
            service.emitMessagesToClient(body as Message);
        } else if (body.type === MessageType.USER) {
            service.emitUserEntered(body as User);
        }
    }

}
