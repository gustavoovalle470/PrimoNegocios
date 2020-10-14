import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from '../services/user/session-manager.service';
import { UserService } from '../services/user/user.service';
import { UIAlertService } from '../UITools/uialert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('usernameInput') usernameInput;
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('usernameItem') usernameItem;
  @ViewChild('passwordItem') passwordItem;

  constructor(public alert : UIAlertService,
              public router: Router,
              public userService: UserService,
              public session : SessionManagerService) {
              }
  
  login(username : string, password : string){
    if(this.validateUsername(username) && this.validatePassword(password)){
      this.userService.getUser(username, password).subscribe(data=>{
        this.session.user_in_session=data;
        this.doLogin();
      });
    }
  }

  validateUsername(username: string): boolean{
    if(username.length!=0 && (!username.includes("@") || !username.includes(".com"))){
      this.usernameItem.color="danger";
      this.usernameInput.setFocus();
      this.alert.putMsgError('El formato del nombre de usuario no es valido. Verifique e intente nuevamente');
      return false;
    }else if(username.length==0){
      this.usernameItem.color="danger";
      this.usernameInput.setFocus();
      this.alert.putMsgError('El campo usuario no puede estar vacio.');
      return false;
    }else{
      this.usernameItem.color="ligth";
    }
    return true;
  }

  validatePassword(password: string): boolean{
    if(password.length==0){
      this.passwordItem.color="danger";
      this.passwordInput.setFocus();
      this.alert.putMsgError('El campo contraseña no puede estar vacio.');
      return false;
    }
    return true;
  }

  private doLogin(){
    this.returnToNormality();
    if(!this.session.user_in_session){
      this.alert.putMsgError("El usuario y/o contraseña no son válidos. Verifique e intente nuevamente");
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

  private returnToNormality(){
    this.usernameInput.value="";
    this.passwordInput.value="";
    this.usernameItem.color="ligth";
    this.passwordItem.color="ligth";
  }
}
