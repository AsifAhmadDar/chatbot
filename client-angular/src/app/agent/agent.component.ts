import { Component, OnInit, inject } from '@angular/core';
import { MessagingService } from '../shared/services/messaging.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-agent',
  template: `
  <app-chat-list></app-chat-list>
  <section class="inner-section">
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  messageService = inject(MessagingService);
  userService = inject(UserService);
  ngOnInit(): void {
    this.messageService.agent_connect('agent')
    //for project run;
    const user: User = {
      "name": "Agent 1",
      "email": "agent1@gmail.com",
      "role": "agent",
      "status": true
    }
    if(!this.userService.user_value){
      this.userService.create_user(user).subscribe((res:any)=>{
        if(res.status ===200){
          this.userService.set_logged_user(res.data)
        }
      });
    }

  }

}
