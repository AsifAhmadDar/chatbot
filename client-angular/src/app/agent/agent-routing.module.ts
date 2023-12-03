import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { AgentComponent } from './agent.component';
import { AgentChatComponent } from './agent-chat/agent-chat.component';

const routes: Routes = [
  {
    path: '', component: AgentComponent,
    children:[
      {
        path:'chat/:id',
        component:AgentChatComponent
      }
    ] 
  }
];

@NgModule({
  providers:[provideRouter(routes,withComponentInputBinding())],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
