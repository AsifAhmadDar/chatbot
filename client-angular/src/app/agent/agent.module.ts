import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { AgentComponent } from './agent.component';
import { ChatComponent } from '../chat/chat.component';
import { AgentChatComponent } from './agent-chat/agent-chat.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatListComponent,
    AgentComponent,
    AgentChatComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule
  ]
})
export class AgentModule { }
