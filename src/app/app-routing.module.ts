import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import  { HomeComponent } from 'src/app/pages/features/home/home.component';
import { ReadsComponent } from './pages/features/reads/reads.component';

const routes: Routes = [
  {
    path: '',    
    component: HomeComponent
  },
  {
    path: 'home',    
    component: HomeComponent
  },
  {
    path: 'reads',    
    component: ReadsComponent
  }
=======

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
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
>>>>>>> 56cac00e7aeb70608dcb2ba341ac9c797b810e31
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }