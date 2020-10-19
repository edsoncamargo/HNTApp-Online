import { MessageType } from './enums/message-type';

export class Message {
    id: string;
    name: string;
    senderId: string;
    receiverId: string;
    message: string;
    date: string;
    session: string;
    type: MessageType = MessageType.MESSAGE;

    constructor(messageBuilder: MessageBuilder) {
        this.id = messageBuilder.id;
        this.name = messageBuilder.name;
        this.senderId = messageBuilder.senderId;
        this.receiverId = messageBuilder.receiverId;
        this.message = messageBuilder.message;
        this.date = messageBuilder.date;
        this.session = messageBuilder.session;
    }
}

export class MessageBuilder {
    id: string;
    name: string;
    senderId: string;
    receiverId: string;
    message: string;
    date: string;
    session: string;

    constructor() { }

    setId(id: string): MessageBuilder {
        this.id = id;
        return this;
    }

    setName(name: string): MessageBuilder {
        this.name = name;
        return this;
    }

    setSenderId(senderId: string): MessageBuilder {
        this.senderId = senderId;
        return this;
    }

    setReceiverId(receiverId: string): MessageBuilder {
        this.receiverId = receiverId;
        return this;
    }

    setMessage(message: string): MessageBuilder {
        this.message = message;
        return this;
    }

    setDate(): MessageBuilder {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        this.date = h + ':' + m;
        return this;
    }

    setSession(session: string): MessageBuilder {
        this.session = session;
        return this;
    }

    build(): Message {
        return new Message(this);
    }
}
