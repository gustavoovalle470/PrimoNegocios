import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagerService } from '../services/user/session-manager.service';
import { UIAlertService } from '../UITools/uialert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public alert : UIAlertService,
              public router: Router,
              public session : SessionManagerService) { }

  ngOnInit() {
    this.alert.putMsgInfo("Bienvenido "+this.session.user_in_session.strUsuario);
  }

  goToHome(){
    this.session.logout();
    this.router.navigate(['/home']);
  }
}
