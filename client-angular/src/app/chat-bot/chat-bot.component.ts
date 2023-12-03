import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../shared/interfaces/user';
import { IResponse } from '../shared/interfaces/iresponse';
import { MessagingService } from '../shared/services/messaging.service';
import { MessageItem } from '../agent/agent-chat/agent-chat.component';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  show_widget: boolean = true;
  userService = inject(UserService);
  messagingService = inject(MessagingService)
  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  user!: User | null;
  lastSession: string = sessionStorage.getItem('lastSession') || "";
  inputControl = new FormControl(null, [Validators.required]);
  conversation: MessageItem[] = [];
  joined_agent:string=""

  ngOnInit(): void {
    this.user = this.userService.user_value;
    this.get_joined_agent()
    this.recieveMessage()
  }

  create_user() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return
    }
    this.userService.create_user(this.userForm.value).subscribe((res: IResponse) => {
      if (res.status === 200 || res.status === 209) {
        this.user = res.data;
        this.userService.set_logged_user(res.data);
        return
      }
    })
  }

  start_session() {
    // if (this.inputControl.invalid) return
    // if (!this.conversation.length) {
    //   this.lastSession = this.user?._id || "";
    //   this.messagingService.join_room(this.user, (this.inputControl.value || ""))
    //   const messageItem: MessageItem = { class: "sent", message: this.inputControl.value || "" };
    //   this.conversation.push(messageItem);
    //   this.inputControl.reset();
    //   return
    // }
    // this.sendMessage()
  }

  sendMessage() {
    if(this.user?._id && this.inputControl.value){
      this.messagingService.sendMessage(this.user._id,this.inputControl.value)
      const messageItem: MessageItem = { class: "sent", message: this.inputControl.value || "" };
      this.conversation.push(messageItem);
      this.inputControl.reset();
    }

  }

  recieveMessage(){
    this.messagingService.recieveMessage().subscribe((data:any)=>{
      console.log('user recieves',data);
      const messageItem: MessageItem = { class:"recieved", message: data };
      this.conversation.push(messageItem); 
    })
  }

  end_session() {
    this.messagingService.leave_room(this.user)
    // sessionStorage.setItem('lastSession',this.user?._id||"");
    this.user = null;
    this.userService.user.next(null);
    sessionStorage.removeItem('user');
  }

  get_joined_agent(){
    this.messagingService.get_joined_agent().subscribe((data:any)=>{
      console.log('joined-agent', data);
      
      this.joined_agent = data.name;
    })
  }
}
