import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { constants, CustomValidator } from 'src/app/_constants';
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
  


  signupform:boolean = false

  constructor(public fb: FormBuilder) { }

  signUp() {
    
    if (this.signUpForm.invalid) {
      console.log("false")
      return;
    }
    console.log(this.signUpForm.value)
    
  } 

  signIn() {
    if (this.signInForm.invalid) {
      console.log("false")
      return;
    }
    console.log("true")
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


  ngOnInit(): void {


    


    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      password: ['', [Validators.required, CustomValidator.createPasswordStrengthValidator()]],
      confirmPassword: ['']
    }
    , { 
      validator: CustomValidator.mustMatch('password', 'confirmPassword')     
    })   


    this.signInForm = this.fb.group({
      email_mobile: ['', [Validators.required]],     
      password: ['', [Validators.required]],      
    });


    this.requestCallForm = this.fb.group({
      name: ['', [Validators.required]],     
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],      
      date: ['', [Validators.required]],      
      time: ['', [Validators.required]],      
    });

    this.sentMsgForm = this.fb.group({
      name: ['', [Validators.required]],     
      mobile_number: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],      
      message: ['', [Validators.required]]            
    });


    



    var self = this

    // var swiper = new Swiper(".mySwiper", {
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    // });


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
