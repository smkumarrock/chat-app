import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ChatService } from "./../chat.service";
import { ActivatedRoute } from "@angular/router";
import { resolve } from 'url';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  newMessage: string;
  currentRoom: string;
  UserName: string;
  CurrentUserDetails: {room: String, message: String, _id: String, name: String};
  TargetUserDetails: {room: String, message: String, _id: String, name: String};
  userRoom: string;
  targetRoom: string;
  messageList:Array<{room: String, message: String}>=[];

  constructor(private chatService: ChatService, private activateRoute: ActivatedRoute) {
    this.chatService.newmessageRecived().subscribe(data=>{
      this.messageList.push(data)});
   }

  ngOnInit() {
    this.activateRoute.params.subscribe(async roomdetails=>{
      this.currentRoom = roomdetails.roomId;
      this.userRoom = this.currentRoom.substring(0, 6);
      this.targetRoom = this.currentRoom.substring(7, 13);
      console.log(this.userRoom, this.targetRoom);
      await new Promise((resolve, reject)=>{
        this.chatService.SingleUser(this.targetRoom);
        this.chatService.getSingleUser().subscribe(trtuser=>{
          for(var i=0; i<trtuser.length; i++){
            if(trtuser[i].room == this.targetRoom){
            this.TargetUserDetails = trtuser[i];
            }
            if(trtuser[i].room == this.userRoom){
            this.CurrentUserDetails = trtuser[i];
            }
            //     this.CurrentUserDetails = crtuser;
          }

          console.log(this.TargetUserDetails, this.targetRoom);
          resolve(this.TargetUserDetails);
      });
    });
      // await new Promise((resolve, reject)=>{
      //   this.chatService.SingleUser(this.userRoom);
      //   this.chatService.getSingleUser().subscribe(crtuser=>{
      //     console.log(this.userRoom, this.CurrentUserDetails);
      //     resolve(this.CurrentUserDetails);
      //   });
      // });
  });
}

  sendMessage() {
    console.log(this.newMessage, this.currentRoom, );
    this.chatService.sendMessage({CRroom: this.currentRoom, TRroom: this.targetRoom+'-'+this.userRoom, message:this.newMessage, name: this.CurrentUserDetails.name });
    this.newMessage = '';
  }
}
