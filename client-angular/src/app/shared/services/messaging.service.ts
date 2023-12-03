import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../interfaces/user';
import { Observable, Subject } from 'rxjs';

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

  join_room(user: User|null,message:string) {
    if(!user) return;
    this.socket.emit('join-room', {user,message});
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
    return new Observable((observer) => {
      this.socket.on('agent-joined', (data:any) => {
        observer.next(data);
      });
    });
  }
  sendMessage(room:string,message:string){
    this.socket.emit('message',{room,message})
  }
  recieveMessage(){
    return new Observable((observer) => {
      this.socket.on('recieve', (data:any) => {
        observer.next(data);
      });
    });
  }

}
