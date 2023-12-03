import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { UserService } from 'src/app/shared/services/user.service';
export interface MessageItem{
  class:"sent"|"recieved",
  message:string;
}
@Component({
  selector: 'app-agent-chat',
  templateUrl: './agent-chat.component.html',
  styleUrls: ['./agent-chat.component.scss']
})

export class AgentChatComponent implements OnInit{
  @Input() id:string ="";
  messageService = inject(MessagingService);
  agent:User|null = inject(UserService).user_value;
  conversation:MessageItem[]=[];
  inputControl:FormControl = new FormControl(null,[Validators.required]);
  user_left:boolean=false;
  ngOnInit(): void {
    this.acceptUser()
    this.watch_user_left();
    this.messageService.recieveMessage().subscribe((data:any)=>{
      console.log('agent recieves',data);
      const messageItem:MessageItem={class:"recieved",message:data};
      this.conversation.push(messageItem);
    })
  }

  watch_user_left(){
    this.messageService.watch_user_left().subscribe((data: any) => {
      console.log('left', data);
      this.user_left = !data.status
    })
  }

  getUserMessage(){
    this.messageService.recieveMessage().subscribe((data:any)=>{
      console.log('agent recieves',data);
      const messageItem:MessageItem={class:"recieved",message:data};
      this.conversation.push(messageItem);
    })
  }

  sendMessage(){
    if(this.inputControl.invalid) return;
    const messageItem:MessageItem={class:"sent",message:this.inputControl.value};
    this.conversation.push(messageItem);
    this.messageService.sendMessage(this.id,this.inputControl.value);
    this.inputControl.reset();
  }

  acceptUser(){
    if(!this.id)return;
    this.messageService.agent_join(this.id,this.agent)
  }

  getChatConversion(){

  }

}
