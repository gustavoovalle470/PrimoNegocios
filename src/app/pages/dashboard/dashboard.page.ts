import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { ContactServiceService } from 'src/app/services/company/contact-service.service';
import { SessionManagerService } from 'src/app/services/user/session-manager.service';
import { UIAlertService } from 'src/app/UITools/uialert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public alert : UIAlertService,
              public router: Router,
              public session : SessionManagerService,
              private companyService: CompanyService,
              private contactService: ContactServiceService) { }

  ngOnInit() {
    this.alert.putMsgInfo("Bienvenido "+this.session.user_in_session.strUsuario);
    if(!this.session.user_company){
      this.registerCompany();
    }
  }

  logout(){
    this.session.logout();
    this.router.navigate(['/home']);
  }

  getUserConfig(){
    this.companyService.getCompany(this.session.user_in_session).subscribe(data=>{
      this.session.user_company=data;
      if(!this.session.user_company){
        this.registerCompany();
      }else{
        this.contactService.getContact(this.session.user_company).subscribe(data=>{
          this.session.comapny_contact=data;
          if(!this.session.user_company){
            this.registerCompany();
          }
        });
      }
    });
  }

  registerCompany(){
    this.router.navigate(['/register-company']); 
  }
}