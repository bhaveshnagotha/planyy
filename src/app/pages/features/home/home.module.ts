import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/app.shared.module';

import { NgxMaskModule, IConfig } from 'ngx-mask';



@NgModule({
  imports: [
    HomeRoutingModule,     
    SharedModule,
    NgxMaskModule.forRoot(),
    
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }