import { NgModule } from '@angular/core';
import { ReadsRoutingModule } from './reads-routing.module';
import { ReadsComponent } from './reads.component';

@NgModule({
  imports: [
    ReadsRoutingModule,    
  ],
  declarations: [ReadsComponent]
})
export class ReadsModule { }