import { Component, OnInit } from '@angular/core';
import { ChatService } from "./../chat.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  newMessage: string;
  currentRoom: string;
  UserName: string;
  CurrentName: string;
  messageList:Array<{room: String, message: String}>=[];

  constructor(private chatService: ChatService, private activateRoute: ActivatedRoute) {
    this.chatService.newmessageRecived().subscribe(data=>{
      this.messageList.push(data)});
   }

  ngOnInit() {
    this.activateRoute.params.subscribe(roomdetails=>{
      this.currentRoom = roomdetails.roomId;
      this.UserName = roomdetails.UserName;
      this.CurrentName = roomdetails.cname;
    });
  }

  sendMessage() {
    console.log(this.newMessage, this.currentRoom);
    this.chatService.sendMessage({room: this.currentRoom, message:this.newMessage, name: this.CurrentName });
    this.newMessage = '';
  }
}
