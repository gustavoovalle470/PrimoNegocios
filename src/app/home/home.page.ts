import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from '../services/user/session-manager.service';
import { UserService } from '../services/user/user.service';
import { UIAlertService } from '../UITools/uialert.service';

function validaPassword(control : AbstractControl):{[Key:string]: boolean}|null {
  let _passControl = control.value;
  if (_passControl.length > 0) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  loginForm : FormGroup;

  constructor(private alert : UIAlertService,
              private router: Router,
              private userService: UserService,
              private fb : FormBuilder,
              private session : SessionManagerService) {
              }
  
  get errorControl(){
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailControl : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passControl : ['', Validators.required]});
  }

  login(){
    if(validaPassword(this.loginForm.get('passControl')) === null){
      this.userService.getUser(this.loginForm.get('emailControl').value, 
                               this.loginForm.get('passControl').value)
                      .subscribe(data=>{
        this.session.user_in_session=data;
        this.doLogin();
      });
    }else{
      this.alert.putMsgError("La contraseña no es valida.");
    }
  }

  private doLogin(){
    if(!this.session.user_in_session){
      this.alert.putMsgError("El usuario y/o contraseña no son válidos. Verifique e intente nuevamente");
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
