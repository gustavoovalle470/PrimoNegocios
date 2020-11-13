import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-register-company-logo',
  templateUrl: './register-company-logo.page.html',
  styleUrls: ['./register-company-logo.page.scss'],
})
export class RegisterCompanyLogoPage implements OnInit {

  registerLogoCompForm : FormGroup;

  constructor(private alert : UIAlertService,
    private router: Router,
    private companyService: CompanyService,
    private fb : FormBuilder,
    private session : SessionManagerService) { 

    }

  
  get errorControl(){
    return this.registerLogoCompForm.controls;
  }

  ngOnInit() {
    this.registerLogoCompForm = this.fb.group({
      strRazonSocialControl : ['', Validators.required],
      strIdentificacionControl : ['', Validators.required],
      dtmFechaFundacionControl : ['', Validators.required]});
    this.registerLogoCompForm.get('strIdentificacionControl').setValue(this.session.user_company.strIdentificacion);
    this.registerLogoCompForm.get('strRazonSocialControl').setValue(this.session.user_company.strRazonSocial);
    this.registerLogoCompForm.get('dtmFechaFundacionControl').setValue(this.session.user_company.dtmFechaFundacion);
  }

  putLogo(){
    this.alert.putMsgInfo("Esta funcionalidad no está disponible en este momento.");
  }

  goBack(){
    this.router.navigate(['/register-company']);
  }

  registerCompany(){
    console.log(this.session.user_company);
    this.companyService.newCompany(this.session.user_company).subscribe(data => {
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
      this.alert.putMsgInfo('La empresa se creó correctamente');
      this.router.navigate(['register-contact']);
    });
  }
}
