import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { constants, CustomValidator } from "src/app/_constants";

import { AuthenticationService, CommonApiService } from "src/app/_services";
import { first } from "rxjs/operators";
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

declare var Swiper: any;
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  signUpForm: any = FormGroup;
  signInForm: any = FormGroup;
  requestCallForm: any = FormGroup;
  sentMsgForm: any = FormGroup;

  mobileOtpForm:any = FormGroup; 
  emailOtpForm:any = FormGroup; 
  

  socialUser: any = SocialUser;
  isLoggedin: boolean = false;
  sessionActive: boolean = true;

  signupform: boolean = false;

  customerID: number = 0;
  signUpStoredData:any;

  showPass: boolean = false;
  showCPass: boolean = false;
  showPassSignIn: boolean = false;


  passwordCheck: any = {
    eightormore: false,
    upperlower: false,
    onenumber: false,
  };

  constructor(
    private toastr: ToastrService,
    public authenticationService: AuthenticationService,
    public fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private commonApiService: CommonApiService,
    public router: Router
  ) {}

  OnSubmitVerifyMobileOtp(){   
    
    if (this.mobileOtpForm.invalid) {
      return;
    }
    $(".otp-modal-mobile").addClass("d-none");
    $(".otp-modal-email").removeClass("d-none");
    //console.log(this.signUpStoredData[0]['data']['email'])
  }

  OnSubmitVerifyEmailOtp(){    
    if (this.emailOtpForm.invalid) {
      return;
    }  

    $(".otp-modal-email").addClass("d-none");
    $(".welcome-to-planyy").removeClass("d-none");    
    // this.authenticationService
    //   .signup(this.signUpStoredData[0])
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.signUpForm.reset();
    //       $("#dark-overlay").addClass("d-none");
    //       $(".otp-modal-email").addClass("d-none");
    //       this.toastr.success("Customer Created Successfully", "Success");
    //     }
    // );
    
    
    //console.log(this.signUpStoredData[0]['data']['email'])
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    let signUpFrmData = [];

    var data = 
    {
      data: this.signUpForm.value,
    }
    signUpFrmData.push(data);
    this.signUpStoredData = signUpFrmData;    
    
    $("#dark-overlay").removeClass("d-none");
    $("#signup-modal").addClass("d-none");
    $(".otp-modal-mobile").removeClass("d-none");
    
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.signInForm.value)
      .pipe(first())
      .subscribe((data) => {
        this.signInForm.reset();
        this.getCurrentUserInfo();
        this.router.navigate(["service"]);
        this.toastr.success("Welcome back!", "Success");
      });
  }

  getCurrentUserInfo() {
    this.commonApiService
      .getCurrentUserInfo()
      .pipe(first())
      .subscribe((response) => {
        localStorage.setItem("CustomerInfo", JSON.stringify(response.data));
      });
  }

  logOut(str: string) {
    this.customerID = 0;
    this.authenticationService.logout();

    if (str == "rightsidebtn") {
      $("#dark-overlay-beneath").addClass("d-none");
      $("#right-menu").addClass("d-none");
    }

    this.toastr.success("Logout Successfully", "Success");
  }

  requestCall() {
    if (this.requestCallForm.invalid) {
      console.log("false");
      return;
    }    
    $(".call-modal-popup").addClass("d-none");
    $(".call-modal-popup-msg").removeClass("d-none");    
    console.log("true");
  }

  sentMessage() {
    if (this.sentMsgForm.invalid) {
      console.log("false");
      return;
    }
    console.log("true");
  }

  showForm(e: string) {
    this.signUpForm.reset();
    this.signInForm.reset();

    this.showPass = false;
    this.showCPass = false;
    this.showPassSignIn = false;

    if (e == "signin") {
      this.signupform = false;
    } else {
      this.signupform = true;
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }

  openSignupPopUp(str: string) {
    if (str == "header") {
      this.signupform = false;
      $("#dark-overlay").removeClass("d-none");
      $("#signup-modal").removeClass("d-none");
    }
    if (str == "rightsidebtn") {
      $("#dark-overlay-beneath").addClass("d-none");
      $("#right-menu").addClass("d-none");

      this.signupform = true;
      $("#dark-overlay").removeClass("d-none");
      $("#signup-modal").removeClass("d-none");
    }
  }

  closeModalPopup(){
    $("#dark-overlay").addClass("d-none");    
    $(".close").parent().addClass("d-none");
  }

  showPassword(){    
    this.showPass = !this.showPass;
  }
  showCPassword(){    
    this.showCPass = !this.showCPass;
  }
  showPasswordSignIn(){    
    this.showPassSignIn = !this.showPassSignIn;
  }
  
  ngOnInit(): void {
    let cId = localStorage.getItem("CurrentCustomerInfo");
    this.customerID = JSON.parse(
      cId != null ? JSON.parse(cId)["idCustomer"] : 0
    );

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log("social Auth");
      console.log(this.socialUser);
    });

    this.mobileOtpForm = this.fb.group(
      {
        first_val: ["", [Validators.required]],
        second_val: ["", [Validators.required]],
        third_val: ["", [Validators.required]],
        fourth_val: ["", [Validators.required]]
      }
    );
  
    this.emailOtpForm = this.fb.group(
      {
        first_val: ["", [Validators.required]],
        second_val: ["", [Validators.required]],
        third_val: ["", [Validators.required]],
        fourth_val: ["", [Validators.required]]
      }
    );
  
  this.signUpForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        mobileNumber: [
          "",
          [Validators.required, Validators.pattern("[0-9 ]{10}")],
        ],
        password: [
          "",
          [
            Validators.required,
            CustomValidator.createPasswordStrengthValidator(),
          ],
        ],
        confirmPassword: [""],
      },
      {
        validator: CustomValidator.mustMatch("password", "confirmPassword"),
      }
    );

    this.signInForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.requestCallForm = this.fb.group({
      name: ["", [Validators.required]],
      mobile_number: [
        "",
        [Validators.required, Validators.pattern("[0-9 ]{10}")],
      ],
      date: ["", [Validators.required]],
      time: ["", [Validators.required]],
    });

    this.sentMsgForm = this.fb.group({
      name: ["", [Validators.required]],
      mobile_number: [
        "",
        [Validators.required, Validators.pattern("[0-9 ]{10}")],
      ],
      message: ["", [Validators.required]],
    });

    var self = this;

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
      self.signupform = false;
      self.signUpForm.reset();
      self.signInForm.reset();
      self.showPass = false;
      self.showCPass = false;
      self.showPassSignIn = false;

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

    $(".slider_text_cont_p1 [src='./assets/custom/images/call.svg']").click(
      function () {
        openOverlay();
        $("#call-modal").removeClass("d-none");
      }
    );

    // $("[src='./assets/custom/images/user.svg").click(function () {
    //   openOverlay();
    //   $("#signup-modal").removeClass("d-none");
    // });

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

  checkPassword(event: any) {
    if (event.target.value != "") {
      let string = event.target.value;
      let Uppercase = 0;
      let Lowercase = 0;
      for (var i = 0; i < string.length; i++) {
        if (string[i] >= "A" && string[i] <= "Z") {
          Uppercase++;
        }
        if (string[i] >= "a" && string[i] <= "z") {
          Lowercase++;
        }
        if (string[i] >= "0" && string[i] <= "9") {
          this.passwordCheck.onenumber = true;
        }
        if (string.length >= 8) {
          this.passwordCheck.eightormore = true;
        }
        if (Uppercase > 0 && Lowercase > 0) {
          this.passwordCheck.upperlower = true;
        }
      }
    } else {
      this.passwordCheck.upperlower = false;
      this.passwordCheck.eightormore = false;
      this.passwordCheck.onenumber = false;
    }
  }
}
