import { Component, OnInit, inject } from '@angular/core';
import { MessagingService } from '../shared/services/messaging.service';

@Component({
  selector: 'app-agent',
  template:  `
  <app-chat-list></app-chat-list>
  <section class="inner-section">
    <router-outlet></router-outlet>
  </section>
  `,
  styleUrls:['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  messageService = inject(MessagingService);
  ngOnInit(): void {
  this.messageService.agent_connect('agent')
  }

}
