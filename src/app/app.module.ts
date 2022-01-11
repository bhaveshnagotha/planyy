import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { LayoutRoutingModule } from 'src/app/pages/layout/layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SwiperModule } from 'swiper/angular';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    BrowserAnimationsModule, 
    SwiperModule,
    ToastrModule.forRoot(), // ToastrModule added    
    //LayoutRoutingModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '713781685558-24q23f2de4v0j7d8ao08fu0eimsu38c8.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// 325410935378-af37kn81t1mtf1o8bisrmnlc15q551ot.apps.googleusercontent.com FOR LOCAL
// 567781099933-lak1q2gvsv773sgg48cfegt5f7vpr6ci.apps.googleusercontent.com FOR LIVE
// 713781685558-24q23f2de4v0j7d8ao08fu0eimsu38c8.apps.googleusercontent.com FOR DEV