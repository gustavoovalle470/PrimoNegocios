import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Primoconst } from 'src/app/constants/primoconst';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';


function validaPassword(control1 : AbstractControl, control2 : AbstractControl):{[Key:string]: boolean}|null {
  let _passControl = control1.value;
  let _othePassControl = control2.value;
  if (_passControl === _othePassControl) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registroForm : FormGroup;
  newUser : User;
  errorMessage: string;
  constants: Primoconst;

  get errorControl(){
    return this.registroForm.controls;
  }

  constructor(private userService : UserService, 
              private fb : FormBuilder,
              private alert : UIAlertService,
              private router : Router) { 
                this.constants= new Primoconst();
              }

  ngOnInit() {
    this.registroForm = this.fb.group({
      emailControl : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passControl : ['', Validators.required],
      otherPassControl : ['', Validators.required],
      terminosControl : true
    });
    const _terminosControl = this.registroForm.get('terminosControl');
  }

  saveUser(){
    this.newUser = {
      idUsuario : null,
      strPassword : this.registroForm.get('passControl').value,
      strUsuario : this.registroForm.get('emailControl').value,
      intNumIntentos : 0,
      bitActivo: 1,
      intTipoUsuario : this.constants.USER_BUSINESS
    }

    const result = validaPassword(this.registroForm.get('passControl'), this.registroForm.get('otherPassControl'));
    if(result !== null){
      this.alert.putMsgError( 'La confirmación del password no concuerda con la ingresada');
      return;
    }
    if(!this.errorControl.terminosControl.value){
      this.alert.putMsgError( 'Debes leer y aceptar los terminos y condiciones para continuar');
      return;
    }
  

    this.userService.newUser(this.newUser).subscribe(data => {
      if(!data['succes']){
        this.alert.putMsgError( data['response']);
      return;  
      }
    },
    err => {
      this.alert.putMsgError( err.response);
      return;
    },
    () => {
      this.alert.putMsgInfo('El usuario se creo con exito!');
      this.router.navigate(['home']);
    });

  }
}