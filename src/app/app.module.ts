import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { FooterComponent } from './pages/common/footer/footer.component';
<<<<<<< HEAD
import { HomeComponent } from './pages/features/home/home.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReadsComponent } from './pages/features/reads/reads.component';
=======
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
>>>>>>> 56cac00e7aeb70608dcb2ba341ac9c797b810e31
//import { LayoutRoutingModule } from 'src/app/pages/layout/layout-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD
    FooterComponent,
    HomeComponent,
    ReadsComponent
=======
    FooterComponent    
>>>>>>> 56cac00e7aeb70608dcb2ba341ac9c797b810e31
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    //LayoutRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
