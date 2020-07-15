import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;
  
  constructor(private http: HttpClient,) {
    this.socket = io(this.url);
  }
  
  public sendMessage(message) {
    this.socket.emit('message', message);
  }
  
  joinroom(data){
    this.socket.emit('join', data);
  }

  newmessageRecived() {
    let observable = new Observable<{room: String, message: String, name: String}>
    (_observer=>{
      this.socket.on('new message', (data)=>{
        _observer.next(data);
      });
      return ()=>{this.socket.disconnect();}
    });
    return observable;
    }

    saveUser(loginUser){
      this.socket.emit('login', loginUser);
    }
    UserList(){
      this.socket.emit('userList');
    }

    getUserRoom(){
      let observable = new Observable<String>
      (_observer=>{
        this.socket.on('loginres', (data)=>{
          _observer.next(data);
        });
        return ()=>{this.socket.disconnect();}
      });
      return observable;
    }
    getUsers(){
      let observable = new Observable<[{_id: String, room: String, message: String, name: String}]>
      (_observer=>{
        this.socket.on('getUser', (data)=>{
          _observer.next(data);
        });
        return ()=>{this.socket.disconnect();}
      });
      return observable;
    }
  }
