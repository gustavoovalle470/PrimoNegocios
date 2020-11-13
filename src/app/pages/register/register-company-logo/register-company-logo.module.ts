import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompanyLogoPageRoutingModule } from './register-company-logo-routing.module';

import { RegisterCompanyLogoPage } from './register-company-logo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterCompanyLogoPageRoutingModule
  ],
  declarations: [RegisterCompanyLogoPage]
})
export class RegisterCompanyLogoPageModule {}
