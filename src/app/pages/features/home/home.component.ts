import { Component, OnInit, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { constants, CustomValidator } from "src/app/_constants";

import {
  AuthenticationService,
  CommonApiService,
  CommonService
  
} from "src/app/_services";
import { first } from "rxjs/operators";
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { concat } from "rxjs";

import { environment } from "src/environments/environment";

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
  forgotForm: any = FormGroup;
  requestCallForm: any = FormGroup;
  sentMsgForm: any = FormGroup;

  mobileOtpForm: any = FormGroup;
  forgotMobileOtpForm: any = FormGroup;
  emailOtpForm: any = FormGroup;
  emailOtpGForm: any = FormGroup;

  loginViaOtpForm: any = FormGroup;

  socialUser: any = SocialUser;
  isLoggedin: boolean = false;
  sessionActive: boolean = true;

  signupform: boolean = false;

  loginvia: boolean = true;

  customerID: number = 0;
  signUpStoredData: any;
  signUpStoredData1: any;
  signUpGAuthStoredData: any;
  signUpGStoredData1: any;
  loginOtpStoredData: any;
  mobileOtpStoreData: any;

  showPass: boolean = false;
  showCPass: boolean = false;
  showPassSignIn: boolean = false;
  submitted: boolean = false;

  tooltipShow: boolean = false;

  setValOfRegGoogle:boolean = false;  
  setValOfLoginGoogle:boolean = false;  
  setValOfRegGoogleViewBtn:boolean = false;  
  setValOfLoginGoogleViewBtn:boolean = false;  

  isValidEmail: any;
  isValidMobile: any;

  emailOtpName: any;
  mobOtpName: any;
  emailOtpGName: any;
  forgotMobOtpName: any;
  emailAddtoOtp: any;  

  invalidCredentials:boolean =false;
  invalidCredentialsMsg:any;

  invalidRegCus:boolean =false;
  invalidRegCusMsg:any;

  invalidForgotMobPass:boolean =false;
  invalidForgotMobPassMsg:any;

  invalidLoginMobOtp:boolean =false;
  invalidLoginMobOtpMsg:any;

  invalidGsignCus:boolean =false;
  invalidGsignCusMsg:any;

  invalidGsignupCus:boolean =false;
  invalidGsignupCusMsg:any;

  mobprefix:boolean =true;

  

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
    private commonService: CommonService,
    public router: Router,
    public el: ElementRef
    
  ) {
    this.loginViaOtpForm = this.fb.group({
      first: ["", [Validators.required]],
      second: ["", [Validators.required]],
      third: ["", [Validators.required]],
      forth: ["", [Validators.required]],
    }); 
  
  } 


  focusOnNextTabForgotPassword() {
    for (const key of Object.keys(this.forgotMobileOtpForm.controls)) {
      if (this.forgotMobileOtpForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        break;
      }
    }
  }

  focusOnNextTabSignupMob(){
    
    for (const key of Object.keys(this.mobileOtpForm.controls)) {
      if (this.mobileOtpForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );        
        invalidControl.focus();
        break;
      }
    }
  }

  focusOnNextTabGSigninEmail(){
    for (const key of Object.keys(this.emailOtpGForm.controls)) {
      if (this.emailOtpGForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );        
        invalidControl.focus();
        break;
      }
    }
  }

  focusOnNextTabSignupEmail(){
    for (const key of Object.keys(this.emailOtpForm.controls)) {
      if (this.emailOtpForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );        
        invalidControl.focus();
        break;
      }
    }
  }
  focusOnNextTab() {
    for (const key of Object.keys(this.loginViaOtpForm.controls)) {
      if (this.loginViaOtpForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        break;
      }
    }
  }

  OnSubmitVerifyMobileOtpForgot() {
    if (this.forgotMobileOtpForm.invalid) {
      this.commonService.markAsTouched(this.forgotMobileOtpForm);
      return;
    }

    if (this.forgotMobileOtpForm.valid) {
      this.forgotMobileOtpForm.controls.OTP.setValue(
        String(this.forgotMobileOtpForm.value.first_val) +
          String(this.forgotMobileOtpForm.value.second_val) +
          String(this.forgotMobileOtpForm.value.third_val) +
          String(this.forgotMobileOtpForm.value.fourth_val)
      );      

      let requestData = {
        mobileNumber: this.loginOtpStoredData[0]["data"]["mobileNumber"],
        actionUuid: this.loginOtpStoredData[0]["data"]["actionUuid"],
        otp: this.forgotMobileOtpForm.controls.OTP.value,
        password:this.forgotMobileOtpForm.controls.password.value
      };     
      console.log(requestData);
      this.commonApiService
        .postRequest("customer/v1/forget-password/verify-otp-sms", requestData)
        .subscribe((response) => {
          if (response && response["data"] != "") {
            this.forgotMobileOtpForm.reset();    
            this.router.navigate(["home"]);
            this.toastr.success("Your password has been changed!", "Success");
            return;
          }
        },
        (er) => {                            
          if(er.error.message){
            this.invalidForgotMobPass = true
            this.invalidForgotMobPassMsg = er.error.message 
          }else{
            this.invalidForgotMobPass = false
            this.invalidForgotMobPassMsg = "" 
          }
        });

      
    }

    console.log("success");
  }

  OnSubmitVerifyMobileOtp() {
    if (this.mobileOtpForm.invalid) {
      this.commonService.markAsTouched(this.mobileOtpForm);
      return;
    }

    let mobileOtpFrmData = [];
    var mobileOtpData = {
      data: this.mobileOtpForm.value,
    };

    mobileOtpFrmData.push(mobileOtpData);
    this.mobileOtpStoreData = mobileOtpFrmData;

    $(".otp-modal-mobile").addClass("d-none");
    $(".otp-modal-email").removeClass("d-none");
    //console.log(this.signUpStoredData[0]['data']['email'])
  }

  OnSubmitVerifyEmailOtpWithGLogin() {
    console.log("login successs")

    if (this.emailOtpGForm.invalid) {
      this.commonService.markAsTouched(this.emailOtpGForm);
      return;
    }
    

    var emOtp =
      this.emailOtpGForm.controls.firstgsignemailotp.value +
      this.emailOtpGForm.controls.secondgsignemailotp.value +
      this.emailOtpGForm.controls.thirdgsignemailotp.value +
      this.emailOtpGForm.controls.fourthgsignemailotp.value;
    var userAuthData = this.signUpGAuthStoredData;

    var userAuthRegData = {
      email: this.signUpGStoredData1[0]["data"]["email"],
      otp: emOtp,
      actionUuid: this.signUpGStoredData1[0]["data"]["actionUuid"],      
    };
    this.authenticationService
      .loginWithGoogle(userAuthRegData)
      .pipe(first())
      .subscribe((data) => {
        this.emailOtpGForm.reset();
        this.getCurrentUserInfo();
        this.router.navigate(["service"]);
        this.toastr.success("Welcome back!", "Success");
      },
      (er) => {                            
        if(er.error.message){
          this.invalidGsignCus = true
          this.invalidGsignCusMsg = er.error.message 
        }else{
          this.invalidGsignCus = false
          this.invalidGsignCusMsg = "" 
        }
      });    
  }

  OnSubmitVerifyEmailOtpWithGRegister() {
    if (this.emailOtpGForm.invalid) {
      this.commonService.markAsTouched(this.emailOtpGForm);
      return;
    }
    var emOtp =
      this.emailOtpGForm.controls.firstgsignemailotp.value +
      this.emailOtpGForm.controls.secondgsignemailotp.value +
      this.emailOtpGForm.controls.thirdgsignemailotp.value +
      this.emailOtpGForm.controls.fourthgsignemailotp.value;
    var userAuthData = this.signUpGAuthStoredData;

    var userAuthRegData = {
      isViaGoogle: true,
      otpEmail: emOtp,
      actionUuidEmail: this.signUpGStoredData1[0]["data"]["actionUuid"],
      data: {
        name: userAuthData[0]["name"],
        email: userAuthData[0]["email"]        
      },
    };
    console.log(userAuthRegData);

    this.authenticationService
      .signup(userAuthRegData)
      .pipe(first())
      .subscribe((data) => {
        this.signUpForm.reset();
        this.emailOtpGForm.reset();
        $("#dark-overlay").removeClass("d-none");
        $(".otp-modal-email-via-google-login").addClass("d-none");
        $(".welcome-to-planyy").removeClass("d-none");
        //this.toastr.success("Customer Created Successfully", "Success");
      },
      (er) => {                            
        if(er.error.message){
          this.invalidGsignCus = true
          this.invalidGsignCusMsg = er.error.message 
        }else{
          this.invalidGsignCus = false
          this.invalidGsignCusMsg = "" 
        }
      });

    //$(".otp-modal-email").addClass("d-none");
    //$(".welcome-to-planyy").removeClass("d-none");

    //console.log(this.signUpStoredData[0]['data']['email'])
  }

  OnSubmitVerifyEmailOtp() {
    if (this.emailOtpForm.invalid) {
      this.commonService.markAsTouched(this.emailOtpForm);
      return;
    }

    var mobOtp =
      this.mobileOtpStoreData[0]["data"]["firstmobotp"] +
      this.mobileOtpStoreData[0]["data"]["secondmobotp"] +
      this.mobileOtpStoreData[0]["data"]["thirdmobotp"] +
      this.mobileOtpStoreData[0]["data"]["fourthmobotp"];
    var emOtp =
      this.emailOtpForm.controls.firstemailotp.value +
      this.emailOtpForm.controls.secondemailotp.value +
      this.emailOtpForm.controls.thirdemailotp.value +
      this.emailOtpForm.controls.fourthemailotp.value;    
    var data = this.signUpStoredData[0]["data"];
    var custRegData = {
      isViaGoogle: false,
      otpMobile: mobOtp,
      actionUuidMobile: this.signUpStoredData1[0]["data"]["actionUuidMobile"],
      otpEmail: emOtp,
      actionUuidEmail: this.signUpStoredData1[0]["data"]["actionUuidEmail"],
      data,
    };
    console.log(custRegData);

    this.authenticationService
      .signup(custRegData)
      .pipe(first())
      .subscribe((data) => {
        this.signUpForm.reset();
        this.mobileOtpForm.reset();
        this.emailOtpForm.reset();
        $("#dark-overlay").removeClass("d-none");
        $(".otp-modal-email").addClass("d-none");
        $(".welcome-to-planyy").removeClass("d-none");

        //this.toastr.success("Customer Created Successfully", "Success");
      },
      (er) => {                            
        if(er.error.message){
          this.invalidRegCus = true
          this.invalidRegCusMsg = er.error.message 
        }else{
          this.invalidRegCus = false
          this.invalidRegCusMsg = "" 
        }
      });

    //$(".otp-modal-email").addClass("d-none");
    //$(".welcome-to-planyy").removeClass("d-none");

    //console.log(this.signUpStoredData[0]['data']['email'])
  }

  onEmailChange(val: any) {

    if (this.signUpForm.controls.email.invalid) {
      this.commonService.markAsTouched(this.signUpForm.controls.email.value);
      return;
    }
    
    // Check email address exist or not
    this.commonApiService
      .getRequest("customer/v1/unique-email/" + val)
      .subscribe(
        (response) => {
          if (response) {
          }
        },
        (error) => {          
          this.signUpForm.controls["email"].setErrors({
            emailAlreadyExist: true,
          });
        }
      );
  }

  onMobileChange(val: any) {   
    this.mobprefix = true;
    if (this.signUpForm.controls.mobileNumber.invalid) {
      this.commonService.markAsTouched(this.signUpForm.controls.mobileNumber.value);
      return;
    }
    
    // Check email address exist or not
    this.commonApiService
      .getRequest("customer/v1/unique-mobile/" + val)
      .subscribe(
        (response) => {
          if (response) {
          }
        },
        (error) => {          
          this.signUpForm.controls["mobileNumber"].setErrors({
            mobileAlreadyExist: true,
          });
        }
      );
  }

  onSubmitSignUp() {
    if (this.signUpForm.invalid) {
      this.commonService.markAsTouched(this.signUpForm);
      return;
    }
    let signUpFrmData = [];
    var data = {
      data: this.signUpForm.value,
    };
    signUpFrmData.push(data);
    this.signUpStoredData = signUpFrmData;
    //console.log(this.signUpStoredData);
    //this.onPercentChange(this.signUpStoredData[0]['data']['email']);

    this.emailOtpName = this.signUpStoredData[0]["data"]["email"];
    this.mobOtpName = this.signUpStoredData[0]["data"]["mobileNumber"];
    var otpData = {
      email: this.signUpStoredData[0]["data"]["email"],
      //mobileNumber: "9662948584",
      mobileNumber:this.signUpStoredData[0]['data']['mobileNumber']
    };

    let signUpFrmData1: any = [];
    this.commonApiService
      .postRequest("customer/v1/register-customer/generate-otp", otpData)
      .subscribe((response) => {
        if (response && response["data"] != "") {
          signUpFrmData1.push(response);
          this.signUpStoredData1 = signUpFrmData1;
          this.toastr.success("Mobile & Email OTP has been sent", "Success");
        }
      });

    $("#dark-overlay").removeClass("d-none");
    $("#signup-modal").addClass("d-none");
    $(".otp-modal-mobile").removeClass("d-none");
  }

  signIn() {

    this.invalidCredentials = false
    this.invalidLoginMobOtp = false
    if (!this.loginvia && this.loginViaOtpForm.invalid) {
      this.commonService.markAsTouched(this.loginViaOtpForm);
      return;
    }

    if (!this.loginvia && this.loginViaOtpForm.valid) {
      this.signInForm.controls.OTP.setValue(
        String(this.loginViaOtpForm.value.first) +
          String(this.loginViaOtpForm.value.second) +
          String(this.loginViaOtpForm.value.third) +
          String(this.loginViaOtpForm.value.forth)
      );
      this.signInForm.controls.password.setValue("");

      let requestData = {
        mobileNumber: this.signInForm.controls.username.value,
        actionUuid: this.loginOtpStoredData[0]["data"]["actionUuid"],
        otp: this.signInForm.controls.OTP.value,
      };

      this.commonApiService
        .postRequest("customer/v1/forget-password/verify-otp-sms", requestData)
        .subscribe((response) => {
          if (response) {
            this.loginViaOtpForm.reset();
            this.signInForm.reset();
            this.getCurrentUserInfo();
            this.router.navigate(["service"]);
            this.toastr.success("Welcome back!", "Success");
            return;
          }
        },
        (er) => {                            
          if(er.error.message){
            this.invalidLoginMobOtp = true
            this.invalidLoginMobOtpMsg = er.error.message 
          }else{
            this.invalidLoginMobOtp = false
            this.invalidLoginMobOtpMsg = "" 
          }
        });
    }

    //console.log(this.signInForm)

    this.signInForm.controls.username.clearValidators();
    this.signInForm.controls.username.setValidators([Validators.required]);
     this.signInForm.controls.password.setValidators([Validators.required]);
     this.signInForm.controls.username.updateValueAndValidity();
     this.signInForm.controls.password.updateValueAndValidity();


    if (this.signInForm.invalid) {
      this.commonService.markAsTouched(this.signInForm);
      return;
    }

    if (this.loginvia) {      
      this.authenticationService
        .login(this.signInForm.value)
        .pipe(first())
        .subscribe((data) => {
          this.signInForm.reset();
          this.getCurrentUserInfo();
          this.router.navigate(["service"]);
          this.toastr.success("Welcome back!", "Success");
        },
        (er) => {                            
          if(er.error.message){
            this.invalidCredentials = true
            this.invalidCredentialsMsg = er.error.message 
          }else{
            this.invalidCredentials = false
            this.invalidCredentialsMsg = "" 
          }
        });
    }
  }

  checkString(value:any){
    
    if (Number(value)) {
      this.forgotForm.controls.username.setValidators([
        Validators.required,
        CustomValidator.mobileNumber,
        Validators.minLength(10)
      ]);
      this.forgotForm.controls.username.updateValueAndValidity();
    }
    else{
      this.forgotForm.controls.username.setValidators([Validators.required, Validators.email]);
      this.forgotForm.controls.username.updateValueAndValidity();
    }
  }

  OnSubmitForgot() {
    if (this.forgotForm.invalid) {
      this.commonService.markAsTouched(this.forgotForm);
      return;
    }
    let emailornumber = this.forgotForm.controls.username.value;    
    if (Number(emailornumber)) {      

      this.forgotForm.controls.username.updateValueAndValidity();

      let mobileNo = {
        mobileNumber: emailornumber,
      };

      this.forgotMobOtpName = emailornumber;
      let loginOtpUuidStored: any = [];
      this.commonApiService
        .postRequest("customer/v1/forget-password/generate-otp", mobileNo)
        .subscribe((response) => {
          if (response && response["data"] != "") {
            loginOtpUuidStored.push(response);
            this.loginOtpStoredData = loginOtpUuidStored;
            $(".forgot-pass-modal").addClass("d-none");
            $(".forgot-pass-otp-modal-login").removeClass("d-none");
            this.toastr.success(
              "OTP has been sent on your mobile number",
              "Success"
            );
            this.forgotMobileOtpForm.reset();
          }
        });
    } else {   
      this.emailAddtoOtp = this.forgotForm.controls.username.value;
      let emailAddress = {
        email: emailornumber,
        url: "https://dev.planyy.com/#/reset-password",
      };
      this.commonApiService
        .postRequest("customer/v1/change-password/generate-otp", emailAddress)
        .subscribe((response) => {
          if (response && response["data"] != "") {            
            localStorage.setItem('resetEmail', response['data']['email']);
            localStorage.setItem('resetActionUuid', response['data']['actionUuid']);
            $(".forgot-pass-modal").addClass("d-none");
            $(".forgotpass-modal-popup-msg").removeClass("d-none");
            //this.toastr.success("OTP has been sent on your email address", "Success");
          }
        });
    }

    console.log("ok success");
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
      this.commonService.markAsTouched(this.requestCallForm);
      return;
    }
    $(".call-modal-popup").addClass("d-none");
    $(".call-modal-popup-msg-for-msgsend").removeClass("d-none");
  }

  sentMessage() {
    if (this.sentMsgForm.invalid) {
      this.commonService.markAsTouched(this.sentMsgForm);
      return;
    }
  }

  resendEmailOtp(val: number) {
    this.emailOtpForm.reset();    
    this.invalidRegCus = false;
    this.invalidGsignCus = false;
    let emailAddress = {
      email: val,
    };
    console.log(val);
    var signUpGFrmData1:any = [];
    this.emailOtpGForm.reset();
    this.commonApiService
      .postRequest("customer/v1/change-password/generate-otp", emailAddress)
      .subscribe((response) => {
        if (response && response["data"] != "") {
          signUpGFrmData1.push(response);
          this.signUpGStoredData1 = signUpGFrmData1;
          this.toastr.success(
            "OTP has been sent on your email address",
            "Success"
          );
        }
      });
  }

  resendMobOtp(val: any) {
    this.mobileOtpForm.reset();    
    let mobileNo = {
      mobileNumber: val,
    };
    
    this.forgotMobileOtpForm.controls["first_val"].setValue("");
    this.forgotMobileOtpForm.controls["second_val"].setValue("");
    this.forgotMobileOtpForm.controls["third_val"].setValue("");
    this.forgotMobileOtpForm.controls["fourth_val"].setValue("");
    this.invalidForgotMobPass = false
    
    console.log(val);
    let loginOtpUuidStored: any = [];    
    this.commonApiService
      .postRequest("customer/v1/forget-password/generate-otp", mobileNo)
      .subscribe((response) => {
        if (response && response["data"] != "") {
          loginOtpUuidStored.push(response);
          this.loginOtpStoredData = loginOtpUuidStored;
          this.toastr.success(
            "OTP has been sent on your mobile number",
            "Success"
          );
        }
      });
  }

  showOtpPassField(e: string, username: string) {
    this.signInForm.controls.username.setValidators([
      Validators.required,
      CustomValidator.mobileNumber,
    ]);
    this.signInForm.controls.username.updateValueAndValidity();

    this.signInForm.controls.password.clearValidators();
    this.signInForm.controls.password.updateValueAndValidity();

    this.loginViaOtpForm.controls["first"].setValue("");
    this.loginViaOtpForm.controls["second"].setValue("");
    this.loginViaOtpForm.controls["third"].setValue("");
    this.loginViaOtpForm.controls["forth"].setValue("");

    if (this.signInForm.invalid) {
      console.log(this.signInForm);
      this.commonService.markAsTouched(this.signInForm);
      return;
    }

    if (e == "showpassfield") {
      this.loginvia = false;
      let mobileNo = {
        mobileNumber: this.signInForm.controls.username.value,
      };
      let loginOtpUuidStored: any = [];
      this.commonApiService
        .postRequest("customer/v1/forget-password/generate-otp", mobileNo)
        .subscribe((response) => {
          if (response && response["data"] != "") {
            loginOtpUuidStored.push(response);
            this.loginOtpStoredData = loginOtpUuidStored;
            this.toastr.success(
              "OTP has been sent to registered mobile number",
              "Success"
            );
          }
        });
    } else {
      this.loginvia = true;
    }
  }
  showForm(e: string) {
    this.signUpForm.reset();
    this.signInForm.reset();

    this.invalidGsignupCus = false
    this.invalidGsignCus = false

    this.showPass = false;
    this.showCPass = false;
    this.showPassSignIn = false;
    this.tooltipShow = false;
    if (e == "signin") {
      this.signupform = false;
    } else {
      this.signupform = true;
    }
  }

  showForgotForm() {
    $("#signup-modal").addClass("d-none");
    $(".forgot-pass-modal").removeClass("d-none");
  }

  authWithGoogle(event:any): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);    
    if(event == 'register'){      
      this.setValOfRegGoogle = true
      this.setValOfRegGoogleViewBtn = true      
    }else{      
      this.setValOfLoginGoogle = true
      this.setValOfLoginGoogleViewBtn = true      
    }

    
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

  closeModalPopup() {
    $("#dark-overlay").addClass("d-none");
    $(".close").parent().addClass("d-none");
  }

  showPassword() {
    this.showPass = !this.showPass;
  }
  showCPassword() {
    this.showCPass = !this.showCPass;
  }
  showPasswordSignIn() {
    this.showPassSignIn = !this.showPassSignIn;
  }


  ngOnInit(): void {    
    //
    let iv: any = "wC5FKsuH951YkGV7";
    //
    let message: any = "7476";
    // 16
    let secret_key: any = "XpUXmLs2WkqhPA9N";

    //utf-8
    message = CryptoJS.enc.Latin1.parse(message);
    secret_key = CryptoJS.enc.Latin1.parse(secret_key);
    iv = CryptoJS.enc.Latin1.parse(iv);

    //Encrypt
    var ciphertext = CryptoJS.AES.encrypt(message, secret_key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      keySize: 128,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log(ciphertext.toString());

    //Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secret_key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      keySize: 128,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log(bytes.toString(CryptoJS.enc.Utf8));

    // var encrypted = this.commonService.set('wC5FKsuH951YkGV7', '7180');
    // var decrypted = this.commonService.get('wC5FKsuH951YkGV7', encrypted);

    // console.log('Encrypted :' + encrypted);
    // console.log('Decrypted :' + decrypted);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;      
      //console.log(this.socialUser);
      this.emailOtpGName = this.socialUser.email;

      if (this.socialUser.id && this.socialUser.email) {
        let emailAddress = {
          email: this.socialUser.email,
        };

        
        if(this.setValOfRegGoogle){
          this.setValOfRegGoogle = false         
          
          this.commonApiService
          .getRequest("customer/v1/unique-email/" + this.socialUser.email)
          .subscribe(
            (response) => {
              if (response) {


                this.setValOfLoginGoogleViewBtn = false
                this.setValOfRegGoogleViewBtn = true
      
                var signUpGFrmData1: any = [];
                var signUpGAuthFrmData: any = [];
                this.emailOtpGForm.reset();
                this.commonApiService
                  .postRequest("customer/v1/change-password/generate-otp", emailAddress)
                  .subscribe((response) => {
                    if (response && response["data"] != "") {
                      signUpGFrmData1.push(response);
                      this.signUpGStoredData1 = signUpGFrmData1;
      
                      signUpGAuthFrmData.push(this.socialUser);
                      this.signUpGAuthStoredData = signUpGAuthFrmData;
      
                      $("#signup-modal").addClass("d-none");
                      $(".otp-modal-email-via-google-login").removeClass("d-none");
                      this.toastr.success(
                        "OTP has been sent on your email address",
                        "Success"
                      );                      
                    }
                  });
      
      
              }
            },
            (er) => {
              if(er.error.message){
                this.invalidGsignupCus = true
                this.invalidGsignupCusMsg = er.error.message 
              }else{
                this.invalidGsignupCus = false
                this.invalidGsignupCusMsg = "" 
              }
            }
          );

        }else{
          
          this.setValOfRegGoogleViewBtn = false
          this.setValOfLoginGoogleViewBtn = true
          console.log(this.setValOfLoginGoogle)
          if(this.setValOfLoginGoogle){
            this.setValOfLoginGoogle = false;

            
            var signUpGFrmData1: any = [];
            var signUpGAuthFrmData: any = [];

            if(this.setValOfLoginGoogleViewBtn){
            this.emailOtpGForm.reset();

            this.commonApiService
              .postRequest("customer/v1/change-password/generate-otp", emailAddress)
              .subscribe((response) => {
                if (response && response["data"] != "") {                  
                  signUpGFrmData1.push(response);
                  this.signUpGStoredData1 = signUpGFrmData1;

                  signUpGAuthFrmData.push(this.socialUser);
                  this.signUpGAuthStoredData = signUpGAuthFrmData;

                  $("#signup-modal").addClass("d-none");
                  $(".otp-modal-email-via-google-login").removeClass("d-none");
                  this.toastr.success(
                    "OTP has been sent on your email address",
                    "Success"
                  );                
                }
              });
            }

          }
          

        }
        
      }
    });

    


    let cId = localStorage.getItem("CurrentCustomerInfo");
    this.customerID = JSON.parse(
      cId != null ? JSON.parse(cId)["idCustomer"] : 0
    );

    

    this.mobileOtpForm = this.fb.group({
      firstmobotp: ["", [Validators.required]],
      secondmobotp: ["", [Validators.required]],
      thirdmobotp: ["", [Validators.required]],
      fourthmobotp: ["", [Validators.required]],
    });

    this.forgotMobileOtpForm = this.fb.group({
      first_val: ["", [Validators.required]],
      second_val: ["", [Validators.required]],
      third_val: ["", [Validators.required]],
      fourth_val: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          CustomValidator.createPasswordStrengthValidator(),
        ],
      ],
      confirmPassword: ["", Validators.required],      
      OTP: [null],
    },{
      validator: CustomValidator.mustMatch("password", "confirmPassword"),
    });

    this.emailOtpForm = this.fb.group({
      firstemailotp: ["", [Validators.required]],
      secondemailotp: ["", [Validators.required]],
      thirdemailotp: ["", [Validators.required]],
      fourthemailotp: ["", [Validators.required]],
    });

    this.emailOtpGForm = this.fb.group({
      firstgsignemailotp: ["", [Validators.required]],
      secondgsignemailotp: ["", [Validators.required]],
      thirdgsignemailotp: ["", [Validators.required]],
      fourthgsignemailotp: ["", [Validators.required]],
    });

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
        confirmPassword: ["", Validators.required],
      },
      {
        validator: CustomValidator.mustMatch("password", "confirmPassword"),
      }
    );

    this.forgotForm = this.fb.group({
      username: [null, [Validators.required]],
      
    });

    this.signInForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      OTP: [null],
      invalidCred:[null],
    });

    this.forgotForm = this.fb.group({
      username: [null, [Validators.required]],
    });

    this.requestCallForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile_number: [
        null,
        [Validators.required, Validators.pattern("[0-9 ]{10}")],
      ],
      date: [null],
      time: [null],
    });

    this.sentMsgForm = this.fb.group({
      name: [null, [Validators.required]],
      mobile_number: [
        null,
        [Validators.required, Validators.pattern("[0-9 ]{10}")],
      ],
      message: [null, [Validators.required]],
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
      self.forgotForm.reset();
      self.showPass = false;
      self.showCPass = false;
      self.showPassSignIn = false;
      self.tooltipShow = false;      
      $("#dark-overlay").addClass("d-none");
    });

    $(".close").click(function () {
      
      self.invalidRegCus =false;
      self.invalidForgotMobPass =false;
      self.invalidLoginMobOtp =false;
      self.invalidCredentials = false;
      self.invalidLoginMobOtp = false;
      self.invalidGsignCus = false;
      self.invalidGsignupCus = false

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
      this.tooltipShow = true;
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
      this.tooltipShow = false;
      this.passwordCheck.upperlower = false;
      this.passwordCheck.eightormore = false;
      this.passwordCheck.onenumber = false;
    }
  }
}
