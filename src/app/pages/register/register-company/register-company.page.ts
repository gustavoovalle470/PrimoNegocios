import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Domain } from 'src/app/models/domain';
import { DomainServiceService } from 'src/app/services/domain/domain-service.service';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  registerCompForm : FormGroup;
  domains: Domain[];

  constructor(private alert : UIAlertService,
    private router: Router,
    private domainService: DomainServiceService,
    private fb : FormBuilder,
    private session : SessionManagerService) { 
      
  }

  ngOnInit() {
    this.registerCompForm = this.fb.group({
      strRazonSocialControl : ['', Validators.required],
      strTipoIdentificacionControl : ['', Validators.required],
      strIdentificacionControl : ['', Validators.required],
      dtmFechaFundacionControl : ['', Validators.required]});
    this.domainService.getDomain(2)
          .subscribe(data=>{
            console.log(data);
          this.domains=data;
          console.log(this.domains);
    });
  }

  createCompany(){
    this.session.user_company = {
      idEmpresa: 0,
      strIdentificacion: this.registerCompForm.get('strIdentificacionControl').value,
      strRazonSocial: this.registerCompForm.get('strRazonSocialControl').value,
      dtmFechaFundacion: this.registerCompForm.get('dtmFechaFundacionControl').value,
      imgLogo: null,
      myUsuario: this.session.user_in_session,
      myDominio:this.getDocumentType(this.registerCompForm.get('strTipoIdentificacionControl').value)
    };
    this.router.navigate(['/register-company-logo']);
  }

  getDocumentType(strTipoId:string):Domain{
    for(let domain of this.domains){
      if(domain['strDescripcion'] === strTipoId){
        return domain;
      }
    }
    return null
  }
}
