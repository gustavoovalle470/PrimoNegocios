import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-register-contact',
  templateUrl: './register-contact.page.html',
  styleUrls: ['./register-contact.page.scss'],
})
export class RegisterContactPage implements OnInit {
  
  registerContactForm : FormGroup;

  constructor(private alert : UIAlertService,
    private router: Router,
    private fb : FormBuilder,
    private session : SessionManagerService) { 
    }
    
  get errorControl(){
    return this.registerContactForm.controls;
  }
  
  ngOnInit() {
    this.registerContactForm = this.fb.group({
      strRazonSocialControl : ['', Validators.required],
      strIdentificacionControl : ['', Validators.required],
      dtmFechaFundacionControl : ['', Validators.required]});
  }
  
  goBack(){
    this.router.navigate(['/register-company-logo']);
  }

  registerContact(){
    
  }
}
