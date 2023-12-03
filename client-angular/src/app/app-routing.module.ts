import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent:()=> import('./chat-bot/chat-bot.component').then(c=>c.ChatBotComponent)
  },
  {
    path:'agent',
    loadChildren:()=> import('./agent/agent.module').then(m=>m.AgentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
