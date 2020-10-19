import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { component: CreateRoomComponent, path: '' },
  { component: ChatComponent, path: 'chat' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
