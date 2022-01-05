import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadsComponent } from './reads.component';


const routes: Routes = [
  {
    path: '',
    component: ReadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadsRoutingModule { }
