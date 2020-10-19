import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { EventEmitter, Injectable } from '@angular/core';

import { Message } from './../../models/message';
import { MessageFactory } from './../../factories/message-factory';
import { User } from '../../models/user';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketChatService {

  private BASE_URL = environment.base_url;
  private stompClient: Stomp;

  message: EventEmitter<Message> = new EventEmitter<Message>();

  connected: EventEmitter<boolean> = new EventEmitter<boolean>();
  whoConnectedMessage: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  initWebSocketConnection(user: User): void {
    const ws = new SockJS(this.BASE_URL);
    this.disconnect(user);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = () => { };
    this.stompClient.connect({}, (_: Message) => {
      this.emitConnection(user);
      this.stompClient.subscribe(`/queue/topic/${user.session}`, (res: any) => {
        const message = res.body;
        if (message) {
          MessageFactory.createMessageByType(message, this);
        }
      });
    });
  }

  sendMessage(message: Message): void {
    this.stompClient.send(`/app/chat/${message.session}`, {}, JSON.stringify(message));
  }

  emitMessagesToClient(message: Message): void {
    this.message.emit(message);
  }

  emitUserEntered(message: User): void {
    this.whoConnectedMessage.emit(message);
  }

  emitConnection(user: User): void {
    this.connected.emit(true);
    this.stompClient.send(`/app/chat/${user.session}`, {}, JSON.stringify(user));
  }

  disconnect(user: User): void {
    if (this.stompClient) {
      this.stompClient.send(`/app/chat/${user.session}`, {}, JSON.stringify(user));
      this.stompClient.disconnect();
    }
  }

}
