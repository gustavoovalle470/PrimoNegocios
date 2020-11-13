import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCompanyLogoPage } from './register-company-logo.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompanyLogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCompanyLogoPageRoutingModule {}
