import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company/company.service';
import { ContactServiceService } from 'src/app/services/company/contact-service.service';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UserService } from 'src/app/services/user/user.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

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
              private session : SessionManagerService,
              private companyService: CompanyService,
              private contactService: ContactServiceService,
              public loadingController: LoadingController) {
              }
  
  get errorControl(){
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailControl : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passControl : ['', Validators.required]});
  }

  async login(){
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión',
    });
    await loading.present();
    if(validaPassword(this.loginForm.get('passControl')) === null){
      this.userService.getUser(this.loginForm.get('emailControl').value, 
                               this.loginForm.get('passControl').value)
                      .subscribe(data=>{
        this.session.user_in_session=data;
        this.doLogin();
      });
    }else{
      this.alert.putMsgError("El usuariio y/o la contraseña no son validos.");
    }
  }

  private doLogin(){
    if(!this.session.user_in_session){
      this.loadingController.dismiss();
      this.alert.putMsgError("El usuario y/o contraseña no son válidos. Verifique e intente nuevamente");
    }else{
      this.getUserConfig();
    }
  }

  async getUserConfig(){
    this.companyService.getCompany(this.session.user_in_session).subscribe(data=>{
      this.session.user_company=data;
      if(this.session.user_company){
        this.contactService.getContact(this.session.user_company).subscribe(data=>{
          this.session.comapny_contact=data;
        });
      }
      this.loginForm.get('emailControl').setValue("");
      this.loginForm.get('passControl').setValue("");
      this.router.navigate(['/dashboard']);
      this.loadingController.dismiss();
    });
  }

}
