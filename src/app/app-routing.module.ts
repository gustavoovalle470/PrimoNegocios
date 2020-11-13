import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forget-pass',
    loadChildren: () => import('./pages/forget-pass/forget-pass.module').then( m => m.ForgetPassPageModule)
  },
  {
    path: 'register-company',
    loadChildren: () => import('./pages/register/register-company/register-company.module').then( m => m.RegisterCompanyPageModule)
  },
  {
    path: 'register-company-logo',
    loadChildren: () => import('./pages/register/register-company-logo/register-company-logo.module').then( m => m.RegisterCompanyLogoPageModule)
  },
  {
    path: 'register-contact',
    loadChildren: () => import('./pages/register/register-contact/register-contact.module').then( m => m.RegisterContactPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
