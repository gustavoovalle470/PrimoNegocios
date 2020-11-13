import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Domain } from 'src/app/models/domain';
import { ContactServiceService } from 'src/app/services/company/contact-service.service';
import { DomainServiceService } from 'src/app/services/domain/domain-service.service';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-register-contact',
  templateUrl: './register-contact.page.html',
  styleUrls: ['./register-contact.page.scss'],
})
export class RegisterContactPage implements OnInit {
  
  registerContactForm : FormGroup;
  domains: Domain[];

  constructor(private alert : UIAlertService,
    private router: Router,
    private fb : FormBuilder,
    private session : SessionManagerService,
    private domainService: DomainServiceService,
    private contactService: ContactServiceService) { 
    }
    
  get errorControl(){
    return this.registerContactForm.controls;
  }
  
  ngOnInit() {
    this.registerContactForm = this.fb.group({
      strNombreControl : ['', Validators.required],
      strApellidoControl : ['', Validators.required],
      strTipoIdentificacionControl : ['', Validators.required],
      strIdentificacionControl : ['', Validators.required],
      strDireccionControl : ['', Validators.required],
      strTelefonoControl : ['', Validators.required],
      strEmailControl : ['', Validators.required],
      dtmFechaNacimientoControl : ['', Validators.required]});
    this.domainService.getDomain(2)
      .subscribe(data=>{
        console.log(data);
      this.domains=data;
      console.log(this.domains);
      this.registerContactForm.get('strEmailControl').setValue(this.session.user_in_session.strUsuario);
});
  }
  
  goBack(){
    this.router.navigate(['/register-company-logo']);
  }

  registerContact(){
    console.log(this.session.user_company);
    this.session.comapny_contact = {
      idContacto:         0,
      strIdentificacion:  this.registerContactForm.get('strIdentificacionControl').value,
      strNombre:          this.registerContactForm.get('strNombreControl').value,
      strApellido:        this.registerContactForm.get('strApellidoControl').value,
      strDireccion:       this.registerContactForm.get('strDireccionControl').value,
      strTelefono:        this.registerContactForm.get('strTelefonoControl').value,
      strEmail:           this.registerContactForm.get('strEmailControl').value,
      dtmFechaNacimiento: this.registerContactForm.get('dtmFechaNacimientoControl').value,
      myEmpresa:          this.session.user_company,
      myDominio:          this.getDocumentType(this.registerContactForm.get('strTipoIdentificacionControl').value)
    }
    console.log(this.session.comapny_contact);
    this.contactService.newContact(this.session.comapny_contact).subscribe(data => {
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
      this.alert.putMsgInfo('Su contacto se registro correctamente');
      this.router.navigate(['dashboard']);
    });
    this.contactService.getContact(this.session.user_company).subscribe(data=>{
      this.session.comapny_contact=data;
    });
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
