import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  user_in_session:User;

  constructor() {}

  logout(){
    this.user_in_session=null;
  }
}
