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
  currentRoom: string;
  currentUser: string;
  
  messageList:Array<{room: String, message: String}>=[];
  constructor(private router: Router, private chatService: ChatService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(currentuser=>{
      this.currentRoom = currentuser.cuser;
      this.currentUser = currentuser.cname;
    })
    this.chatService.UserList();
    this.chatService.getUsers().subscribe(users=>{
      console.log(users, typeof(users));
      for(var i=0; i<users.length; i++){
        if(users[i].room == this.currentRoom){
          // users.splice(i, 1);
        }
      }
      this.User_Arr = users;
    });
  }
  
  joinRoom(req_user){
    console.log(req_user);
    this.selectedRoom = req_user.room;
    this.chatService.joinroom(req_user);
    this.router.navigate(['/openchat/'+this.selectedRoom+'/'+req_user.name+'/'+this.currentUser]);
  }

}
