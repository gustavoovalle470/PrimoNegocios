import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UserService } from 'src/app/services/user/user.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  registerCompForm : FormGroup;

  constructor(private alert : UIAlertService,
    private router: Router,
    private userService: UserService,
    private fb : FormBuilder,
    private session : SessionManagerService) { 

    }

  
  get errorControl(){
    return this.registerCompForm.controls;
  }

  ngOnInit() {
    this.registerCompForm = this.fb.group({
      strRazonSocialControl : ['', Validators.required],
      strIdentificacionControl : ['', Validators.required],
      dtmFechaFundacionControl : ['', Validators.required]});
  }

  createCompany(){
    this.session.user_company = {
      idEmpresa: 0,
      strIdentificacion: this.registerCompForm.get('strIdentificacionControl').value,
      strRazonSocial: this.registerCompForm.get('strRazonSocialControl').value,
      dtmFechaFundacion: this.registerCompForm.get('dtmFechaFundacionControl').value,
      imgLogo: null,
      user: this.session.user_in_session,
      dominio:null,
    };
  }
}
