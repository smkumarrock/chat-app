import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { ChatService } from "./../chat.service";
@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css']
})
export class ChatLoginComponent implements OnInit {


  constructor(private router: Router, private authService: SocialAuthService, private chatService: ChatService) { }

  ngOnInit() {}
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers => { 
      this.chatService.saveUser(socialusers)
    });
  }
 
  signOut(): void {
    this.authService.signOut();
  }
  chatLogin(uname, psw){
    console.log(uname, psw);
    this.chatService.saveUser({name: uname, pswd: psw});
    this.chatService.getCurrentUser().subscribe(data=>{
      console.log(data.ops[0]._id);
      this.router.navigate(['/chat-users/'+data.ops[0]._id]);
    });
  }
}
