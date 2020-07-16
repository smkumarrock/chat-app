import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from "./message/message.component";
import { ChatLoginComponent } from "./chat-login/chat-login.component";
import { ChatInterfaceComponent } from "./chat-interface/chat-interface.component";

const routes: Routes = [
  {path:'', component: ChatLoginComponent},
  {path:'openchat/:roomId', component: MessageComponent},
  {path:'chat-users/:cuser_id', component: ChatInterfaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
