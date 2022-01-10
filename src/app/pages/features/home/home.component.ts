import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { constants, CustomValidator } from 'src/app/_constants';

import { AuthenticationService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';


declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  signUpForm:any = FormGroup;
  signInForm:any = FormGroup;
  requestCallForm:any = FormGroup;
  sentMsgForm:any = FormGroup;


  socialUser:any = SocialUser;
  isLoggedin:boolean = false; 
  


  signupform:boolean = false

  constructor(private toastr: ToastrService, public authenticationService: AuthenticationService,public fb: FormBuilder,private socialAuthService: SocialAuthService) { }

  signUp() {
    
    if (this.signUpForm.invalid) {      
      return;
    }


    var data = [{
      "data": this.signUpForm.value
    }]
  
    
    console.log(this.signUpForm.value)    
    
    this.authenticationService.signup(data[0]).pipe(first()).subscribe(data => {
        console.log(data);
        this.signUpForm.reset();
        this.toastr.success('Customer Created Successfully', 'Success');
    },err => {      
      this.toastr.error(err.error.message, 'Error');
    });   
    
  } 

  signIn() {
    if (this.signInForm.invalid) {    
      return;
    }    
    this.authenticationService.login(this.signInForm.value).pipe(first()).subscribe(data => {        
        this.signInForm.reset();        
        this.toastr.success("Token generated Successfully", 'Success');        
    });    
  } 

  requestCall() {
    if (this.requestCallForm.invalid) {
      console.log("false")
      return;
    }
    console.log("true")
  }
  
  sentMessage() {
    if (this.sentMsgForm.invalid) {
      console.log("false")
      return;
    }
    console.log("true")
  }

  showForm(e:string){
    this.signUpForm.reset();
    this.signInForm.reset();
    
    if(e == 'signin'){
      this.signupform = false
      
    }else{
      this.signupform = true
    }

  }


  loginWithGoogle(): void {    
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }


  ngOnInit(): void {
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log("social Auth");
      console.log(this.socialUser);
    });

    


    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      password: ['', [Validators.required, CustomValidator.createPasswordStrengthValidator()]],
      confirmPassword: ['']
    }
    , { 
      validator: CustomValidator.mustMatch('password', 'confirmPassword')     
    })   


    this.signInForm = this.fb.group({
      username: ['', [Validators.required]],     
      password: ['', [Validators.required]],      
    });


    this.requestCallForm = this.fb.group({
      name: ['', [Validators.required]],     
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],      
      date: ['', [Validators.required]],      
      time: ['', [Validators.required]],      
    });

    this.sentMsgForm = this.fb.group({
      name: ['', [Validators.required]],     
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],      
      message: ['', [Validators.required]]            
    });


    



    var self = this

    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
      },
    });


    function checkForInput(element: any) {
      // element is passed to the function ^

      const $label = $(element).siblings(".demo-label");

      // if ($(element).val().length > 0) {
      //   $label.addClass("input-has-value");
      // } else {
      //   $label.removeClass("input-has-value");
      // }
    }

    // The lines below are executed on page load
    $("input.textdemo").each(function () {
      checkForInput(self);
    });

    // The lines below (inside) are executed on change & keyup
    $("input.textdemo").on("change keyup", function () {
      checkForInput(self);
    });


    if (window.matchMedia("(max-width: 1023px)").matches) {
      $(document).ready(function () {
        $(".planyybody").removeClass("sidebaractive");

        setTimeout(function () {
          $(".planyybody").addClass("sidebaractive1");
        }, 1);
      });
    } else if (window.matchMedia("(max-width: 1023px)").matches) {
      $(document).ready(function () {
        $(".planyybody").removeClass("sidebaractive");

        setTimeout(function () {
          $(".planyybody").addClass("sidebaractive2");
        }, 1);
      });
    } else {
      $(document).ready(function () {
        $(".planyybody").removeClass("sidebaractive");

        setTimeout(function () {
          $(".planyybody").addClass("sidebaractive");
        }, 2000);
      });
    }






    function openOverlay() {
      $("#dark-overlay").removeClass("d-none");
    }

    function closeOverlay() {
      $("#dark-overlay").addClass("d-none");
    }

    $(".custom-modal .close").click(function () {
      self.signupform = false
      self.signUpForm.reset();
      self.signInForm.reset();
      $("#dark-overlay").addClass("d-none");
    });

    $(".close").click(function () {
      $("#dark-overlay-beneath").addClass("d-none");
      $(".close").parent().addClass("d-none");
    });

    $("#right-menu-login .close,#right-menu .close").click(function () {      
      $("#dark-overlay-beneath").addClass("d-none");
      $(self).parent().addClass("d-none");
    });

    $(".slider_text_cont_p1 [src='./assets/custom/images/message.svg']").click(
      function () {
        openOverlay();
        $("#message-modal").removeClass("d-none");
      }
    );

    $(".slider_text_cont_p1 [src='./assets/custom/images/call.svg']").click(function () {
      openOverlay();
      $("#call-modal").removeClass("d-none");
    });

    $("[src='./assets/custom/images/user.svg").click(function () {
      openOverlay();
      $("#signup-modal").removeClass("d-none");
    });

    $("[data-target='#exampleModal6']").click(function () {
      $("#dark-overlay-beneath").removeClass("d-none");
      $("#right-menu").removeClass("d-none");
    });

    $(".timepicker").timepicki({ reset: true });

    // $("#signup-btn").click(function () {
    //   openOverlay();
    //   $("#signup-modal").addClass("d-none");
    //   $("#otp-modal").removeClass("d-none");
    // });

  }

  

  

}
