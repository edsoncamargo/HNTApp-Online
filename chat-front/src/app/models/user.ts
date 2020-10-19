import { MessageType } from './enums/message-type';

export class User {
    id: string;
    name: string;
    session: string;
    entered: boolean;
    type: MessageType = MessageType.USER;

    constructor(userBuilder: UserBuilder) {
        this.id = userBuilder.id;
        this.name = userBuilder.name;
        this.session = userBuilder.session;
        this.entered = userBuilder.entered;
    }
}

export class UserBuilder {
    id: string;
    name: string;
    session: string;
    entered: boolean;

    constructor() { }

    setId(id: string): UserBuilder {
        this.id = id;
        return this;
    }

    setName(name: string): UserBuilder {
        this.name = name;
        return this;
    }

    setSession(session: string): UserBuilder {
        this.session = session;
        return this;
    }

    setEntered(entered: boolean): UserBuilder {
        this.entered = entered;
        return this;
    }

    build(): User {
        return new User(this);
    }
}