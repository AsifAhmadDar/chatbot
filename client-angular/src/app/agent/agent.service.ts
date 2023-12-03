import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  http = inject(HttpClient); 
  constructor() { }

  geActiveUsers(){
    return this.http.get(`${environment.server}agent/users`)
  }
  getUserConversations(){

  }

  

}
