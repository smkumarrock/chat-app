import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ChatService } from "./../chat.service";

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {

  User_Arr:Array<{_id: String, name: String, room: String, message: String}> = [];
  Arr = [];
  selectedRoom: String;
  newMessage: string;
  currentUserId: string;
  currentUser: string;
  currentUserDetails: {room: String, message: String, _id: String, name: String};
  
  messageList:Array<{room: String, message: String}>=[];
  constructor(private router: Router, private chatService: ChatService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(currentuser=>{
      this.currentUserId = currentuser.cuser_id;
    })
    this.chatService.UserList();
    this.chatService.getUsers().subscribe(users=>{
      console.log(users, typeof(users));
      for(var i=0; i<users.length; i++){
        if(users[i]._id == this.currentUserId){
          this.currentUserDetails = users[i];
          users.splice(i, 1);
        }
      }
      this.User_Arr = users;
    });
  }
  
  joinRoom(req_user){
    console.log(this.currentUserDetails);
    this.selectedRoom = req_user.room;
    var roomJoinObj = {'curUserRoom': this.currentUserDetails.room, 'targtUserRoom': req_user.room}
    console.log(roomJoinObj);
    this.chatService.joinroom(roomJoinObj);
    this.router.navigate(['/openchat/'+this.currentUserDetails.room+'-'+req_user.room]);
  }

}
