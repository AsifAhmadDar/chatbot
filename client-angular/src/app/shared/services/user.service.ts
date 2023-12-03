import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { User, default_user } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/iresponse';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User | null> = this.set_user();
  private http = inject(HttpClient)
  constructor() { }

  private set_user(){
    return  new BehaviorSubject<User | null>(
      JSON.parse(sessionStorage.getItem('user')||'null')
    )
  }

  get user_value(){
    return this.user.value;
  }

  create_user(user:User){
    return <Observable<IResponse>>this.http.post(`${environment.server}user/`,user)
  }

  set_logged_user(user:User){
    this.user.next(user);
    sessionStorage.setItem('user',JSON.stringify(user));
  }
  

}
