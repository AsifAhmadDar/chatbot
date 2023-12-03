import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IMessage } from 'src/app/chat-bot/chat-bot.component';
import { User } from 'src/app/shared/interfaces/user';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AgentService } from '../agent.service';
export interface MessageItem {
  class: "sent" | "recieved",
  message: string;
}
@Component({
  selector: 'app-agent-chat',
  templateUrl: './agent-chat.component.html',
  styleUrls: ['./agent-chat.component.scss']
})

export class AgentChatComponent implements OnInit, OnChanges {

  @Input() id: string = "";
  messageService = inject(MessagingService);
  agentService = inject(AgentService);
  agent: User | null = inject(UserService).user_value;
  conversation: MessageItem[] = [];
  inputControl: FormControl = new FormControl(null, [Validators.required]);
  user_left: boolean = false;
  user_name = ""
  message_obj!: IMessage;
  ngOnInit(): void {

    this.getChatConversion()
    if (this.id) {
      this.acceptUser()
    }
    this.watch_user_left();
    this.getUserMessage();
  }


  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if (id.currentValue) {
      this.user_left = false;
      this.conversation = [];
      this.getChatConversion();
      this.acceptUser()
    }

  }


  watch_user_left() {
    this.messageService.watch_user_left().subscribe((data: any) => {
      this.user_left = !data.status
      this.user_name = data.name
    })
  }

  getUserMessage() {
    this.messageService.recieveMessage().subscribe((data: any) => {
      console.log('agent recieves', data);
      const messageItem: MessageItem = { class: "recieved", message: data };
      this.conversation.push(messageItem);
    })
  }

  sendMessage() {
    if (this.inputControl.invalid) return;
    const messageItem: MessageItem = { class: "sent", message: this.inputControl.value };
    this.conversation.push(messageItem);
    this.message_obj.message = messageItem.message;
    this.messageService.sendMessage(this.message_obj);
    this.message_obj.message = '';
    this.inputControl.reset();
  }

  acceptUser() {
    if (!this.id) return;
    this.message_obj = { room: this.id, agent: this.agent?._id, message: '', sender: this.agent?._id }
    this.messageService.agent_join(this.id, this.agent)
  }

  getChatConversion() {
    if (this.id && this.agent?._id)
      this.agentService.getUserConversations(this.id, this.agent?._id).subscribe((res: any) => {
        if (res.status === 200) {
          this.conversation = res.data.map((m: any) => {
            return { class: m.sender === this.agent?._id ? 'sent' : 'revieved', message: m.message }
          })
        }
      })
  }

}
