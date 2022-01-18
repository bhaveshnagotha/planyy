import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { constants, CustomValidator } from "src/app/_constants";
import {
  AuthenticationService,
  CommonApiService,
  CommonService
  
} from "src/app/_services";
declare var Swiper: any;
declare var $: any;
@Component({
  selector: 'app-reads',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: any = FormGroup;
  tooltipShow: boolean = false;

  showPass: boolean = false;
  showCPass: boolean = false;

  invalidResetPass:boolean =false;
  invalidResetPassMsg:any;

  passwordCheck: any = {
    eightormore: false,
    upperlower: false,
    onenumber: false,
  };

  constructor(public router: Router,
            public fb: FormBuilder,
            private commonService: CommonService,
            private commonApiService: CommonApiService,
            private toastr: ToastrService,
            public el: ElementRef) { }

  ngOnInit(): void {

    if(localStorage.getItem('resetEmail') == null && localStorage.getItem('resetActionUuid') == null){
      this.router.navigate(["home"]);
    }

    this.resetForm = this.fb.group(
      {        
        firstresetpass:[null, [Validators.required]],
        secondresetpass:[null, [Validators.required]],
        thirdresetpass:[null, [Validators.required]],
        forthresetpass:[null, [Validators.required]],
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

  }

  onSubmitResetPass(){
    if (this.resetForm.invalid) {
      this.commonService.markAsTouched(this.resetForm);
      return;
    }   
    
    var userAuthRegData = {
      email: localStorage.getItem('resetEmail'),
      otp: this.resetForm.controls.firstresetpass.value +
      this.resetForm.controls.secondresetpass.value +
      this.resetForm.controls.thirdresetpass.value +
      this.resetForm.controls.forthresetpass.value,
      actionUuid: localStorage.getItem('resetActionUuid'),  
      password:this.resetForm.controls.password.value 
    };

    this.commonApiService
    .postRequest("customer/v1/change-password/verify-otp-email", userAuthRegData)
    .subscribe((response) => {
      if (response && response["data"] != "") {
        this.resetForm.reset();    
        this.router.navigate(["home"]);
        //this.toastr.success("Your password has been changed!", "Success");
        return;
      }
    },
    (er) => {                            
      if(er.error.message){
        this.invalidResetPass = true
        this.invalidResetPassMsg = er.error.message 
      }else{
        this.invalidResetPass = false
        this.invalidResetPassMsg = "" 
      }
    });



    console.log(this.resetForm.value);
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

  showPassword() {
    console.log("test");
    this.showPass = !this.showPass;
  }
  showCPassword() {
    this.showCPass = !this.showCPass;
  }

  focusOnNextTab(){    
    for (const key of Object.keys(this.resetForm.controls)) {
      if (this.resetForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );        
        invalidControl.focus();
        break;
      }
    }
  }

}
