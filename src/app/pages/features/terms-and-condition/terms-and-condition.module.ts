import { NgModule } from '@angular/core';
import { TermsAndConditionRoutingModule } from './terms-and-condition-routing.module';
import { TermsAndConditionComponent } from './terms-and-condition.component';

@NgModule({
  imports: [
    TermsAndConditionRoutingModule,    
  ],
  declarations: [TermsAndConditionComponent]
})
export class TermsAndConditionModule { }