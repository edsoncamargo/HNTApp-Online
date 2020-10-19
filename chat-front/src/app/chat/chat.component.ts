import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message, MessageBuilder } from './../models/message';

import { FormControl } from '@angular/forms';
import { MessageType } from './../models/enums/message-type';
import { NgIf } from '@angular/common';
import { User } from './../models/user';
import { UserBuilder } from '../models/user';
import { WebsocketChatService } from './../services/websocket-chat/websocket-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages: Array<any> = new Array<any>();
  id: string;
  session: string;

  message = new FormControl('');

  color = {};

  connected = false;

  MessageType: MessageType;

  constructor(private webSocketChatService: WebsocketChatService) {
    this.MessageType = MessageType.MESSAGE;
    this.getSession();
    this.generateRandomChatToken();
    this.hasMessages();
  }

  ngOnInit(): void {
    this.genereteAvatarColor();
    this.getMessages();
    this.getUserMessages();
    this.initWebSocketConnection();
    this.showConnecting();
    this.handlingConnectionStatus();
  }

  ngOnDestroy(): void {
    this.disconnectCurrentUser();
  }

  disconnectCurrentUser(): void {
    this.webSocketChatService.disconnect(new UserBuilder()
      .setId(this.id)
      .setName(localStorage.getItem('name'))
      .setSession(this.session)
      .setEntered(false)
      .build());
  }

  initWebSocketConnection(): void {
    this.webSocketChatService.initWebSocketConnection(new UserBuilder()
      .setId(this.id)
      .setName(localStorage.getItem('name'))
      .setSession(this.session)
      .setEntered(true)
      .build());
  }

  generateRandomChatToken(): void {
    if (!localStorage.getItem('id')) {
      this.id = Math.random().toString(36).substring(7);
      localStorage.setItem('id', this.id);
    } else {
      this.id = localStorage.getItem('id');
    }
  }

  getSession(): void {
    this.session = localStorage.getItem('session');
  }

  handleButtonSendMessage(): void {
    if (this.message.value && this.connected === true) {
      this.webSocketChatService.sendMessage(new MessageBuilder().setName(localStorage.getItem('name')).setSenderId(this.id)
        .setMessage(this.message.value).setDate().setSession(this.session).build());
      this.resetMessageControl();
    }
  }

  getMessages(): void {
    this.webSocketChatService.message.subscribe((message: Message) => {
      this.messages.push(message);
      localStorage.setItem('messages', JSON.stringify(this.messages));
      this.scrollChatDown();
    });
  }

  getUserMessages(): void {
    this.webSocketChatService.whoConnectedMessage.subscribe((message: User) => {
      this.messages.push(message);
      localStorage.setItem('messages', JSON.stringify(this.messages));
      this.scrollChatDown();
    });
  }

  hasMessages(): void {
    const messages = JSON.parse(localStorage.getItem('messages')) as Array<Message>;
    if (messages) {
      this.messages = messages;
      this.scrollChatDown();
    }
  }

  resetMessageControl(): void {
    this.message.reset();
  }

  genereteAvatarColor(): void {
    const colors = [{ 'background-color': '#000' }, { 'background-color': '#1A1423' }, { 'background-color': '#FCAF58' }, { 'background-color': '#016FB9' },
    { 'background-color': '#353531' }, { 'background-color': '#CF5C36' }, { 'background-color': '#DA4167' }];
    this.color = colors[Math.floor(Math.random() * (6 - 0) + 0)];
  }

  scrollChatDown(): void {
    setTimeout(() => {
      const element = document.querySelector('#chat');
      if (element) {
        element.scrollTop = element.scrollHeight - element.clientHeight + 100;
      }
    }, 300);
  }

  showConnecting(): void {
    const connecting = document.getElementById('connecting');
    const connectingMessage = document.getElementById('connectingMessage');
    setTimeout(() => {
      if (connecting && connectingMessage) {
        connecting.style.height = '47px';
        connectingMessage.style.display = 'flex';
        setTimeout(() => {
          connectingMessage.style.padding = '10px 26px';
          connectingMessage.innerHTML = 'CONNECTING...';
          this.handlingConnectionStatus();
        }, 350);
      }
    }, 300);
  }

  hideConnecting(): void {
    const connecting = document.getElementById('connecting');
    const connectingMessage = document.getElementById('connectingMessage');
    if (connecting && connectingMessage) {
      connectingMessage.style.background = 'rgb(18, 78, 18)';
      connectingMessage.innerHTML = 'CONNECTED...';
      setTimeout(() => {
        connecting.style.height = '0px';
        connectingMessage.style.padding = '0px 0px';
        connectingMessage.innerHTML = '';
        setTimeout(() => {
          connectingMessage.style.display = 'none';
        }, 300);
      }, 600);
    }
  }

  handlingConnectionStatus(): void {
    this.webSocketChatService.connected.subscribe((connection: boolean) => {
      if (connection === true) {
        setTimeout(() => {
          this.connected = true;
          this.hideConnecting();
        }, 1000);
      }
    });
  }

}
