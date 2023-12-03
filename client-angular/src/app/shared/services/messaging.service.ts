import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';
import { IMessage } from 'src/app/chat-bot/chat-bot.component';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private socket = inject(Socket);
  watch_user$ =new Subject(); 
  constructor() {
    this.socket_start()
  }

  socket_start() {
    this.socket.connect();
  }

  join_room(user: User|null) {
    if(!user) return;
    this.socket.emit('join-room', user);
  }
  leave_room(user: User|null) {
    if(!user) return;
    this.socket.emit('leave-room', user);
  }

  agent_connect(agent='agent'){
    this.socket.emit('agent-connected',agent+Date.now())
  }

  watch_user_joined(){
    return new Observable((observer) => {
      this.socket.on('join-room', (userId: any) => {
        observer.next(userId);
      });
    });
  }

  watch_user_left(){
    return new Observable((observer) => {
      this.socket.on('leave-room', (userId: any) => {
        observer.next(userId);
      });
    });
  }


  agent_join(room:string,agent:User|null){
    this.socket.emit('agent-join',{room,agent})
  }

  get_joined_agent(){
    return new Observable<User>((observer) => {
      this.socket.on('agent-joined', (data:User) => {
        console.log(data);
        
        observer.next(data);
      });
    });
  }
  sendMessage(message_obj:IMessage){
    console.log(message_obj);
    
    this.socket.emit('message',message_obj)
  }
  recieveMessage(){
    return new Observable((observer) => {
      this.socket.on('recieve', (data:any) => {
        observer.next(data);
      });
    });
  }

}
