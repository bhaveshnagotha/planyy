import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }