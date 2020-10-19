import { AlertModule } from 'ngx-alerts';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './chat/chat.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketChatService } from './services/websocket-chat/websocket-chat.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' })
  ],
  providers: [WebsocketChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
