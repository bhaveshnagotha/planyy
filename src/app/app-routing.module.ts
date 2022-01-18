import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/pages/features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/pages/features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'reads',
    loadChildren: () => import('src/app/pages/features/reads/reads.module').then(m => m.ReadsModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('src/app/pages/features/about-us/about-us.module').then(m => m.AboutUsModule)
  },  
  {
    path: 'terms',
    loadChildren: () => import('src/app/pages/features/terms-and-condition/terms-and-condition.module').then(m => m.TermsAndConditionModule)
  },
  {
    path: 'service',
    loadChildren: () => import('src/app/pages/features/service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('src/app/pages/features/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },  
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }