import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../shared/interfaces/user';
import { IResponse } from '../shared/interfaces/iresponse';
import { MessagingService } from '../shared/services/messaging.service';
import { MessageItem } from '../agent/agent-chat/agent-chat.component';
export interface IMessage {
  room?: string,
  agent?: string,
  message: string,
  sender?: string,
}
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  show_widget: boolean = false;
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
  joined_agent: string = ""
  message_obj = <IMessage>{};
  ngOnInit(): void {
    this.user = this.userService.user_value;
    if (this.user) {
      this.messagingService.join_room(this.user)
      this.message_obj = {room:this.user._id,agent:'',message:'',sender:this.user._id}
    }
    this.get_joined_agent()
    this.recieveMessage()
  }

  create_user() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return
    }
    this.userService.create_user(this.userForm.value).subscribe((res: IResponse) => {
      if (res.status === 200) {
        this.user = res.data;
        this.userService.set_logged_user(res.data);
        this.message_obj = {room:this.user?._id,agent:"",message:"",sender:this.user?._id}
        this.messagingService.join_room(this.user)
        return
      }
    })
  }

  sendMessage() {
    if (this.user?._id && this.inputControl.value) {
      this.message_obj = {...this.message_obj,message:this.inputControl.value}
      this.messagingService.sendMessage(this.message_obj)
      this.message_obj.message="";
      const messageItem: MessageItem = { class: "sent", message: this.inputControl.value || "" };
      this.conversation.push(messageItem);
      this.inputControl.reset();
    }

  }

  recieveMessage() {
    this.messagingService.recieveMessage().subscribe((data: any) => {
      console.log('user recieves', data);
      const messageItem: MessageItem = { class: "recieved", message: data };
      this.conversation.push(messageItem);
    })
  }

  end_session() {
    this.joined_agent="";
    this.messagingService.leave_room(this.user)
    this.user = null;
    this.conversation = []
    this.userService.user.next(null);
    sessionStorage.removeItem('user');
  }

  get_joined_agent() {
    this.messagingService.get_joined_agent().subscribe((data: User) => {
      this.joined_agent = data?.name;
      this.message_obj.agent = data._id;
      console.log(this.message_obj);
      
    })
  }
}
