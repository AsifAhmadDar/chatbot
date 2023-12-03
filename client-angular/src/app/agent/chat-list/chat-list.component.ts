import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  agentService = inject(AgentService);
  messageService = inject(MessagingService);
  live_users: any[] = []
  router = inject(Router)
  ngOnInit(): void {
    this.getActiveUsers()
    this.messageService.watch_user_joined().subscribe((data: any) => {
      console.log(data);
      const { user } = data;
      user.new = true;
      this.live_users.push(data.user);
    })
  }

  navigate_to_chat(id: string) {
    const userNew = this.live_users.find((u: any) => u._id === id);
    userNew.new = false;
    this.router.navigate([`/agent/chat/${id}`]);
  }

  getActiveUsers(){
    this.agentService.geActiveUsers().subscribe((res:any)=>{
      console.log(res);
      
     if(res.status ===200){
      this.live_users = [...this.live_users,...res.data]
     }
    })
  }

}
