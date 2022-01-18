import { NgModule } from '@angular/core';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from 'src/app/app.shared.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  imports: [
    ResetPasswordRoutingModule,  
    SharedModule,
    NgxMaskModule.forRoot(),  
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }