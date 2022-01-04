import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { HomeComponent } from 'src/app/pages/features/home/home.component';
 
const routes: Routes = [
  {
    path: '',    
    component: HomeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
