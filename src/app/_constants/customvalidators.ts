import { AbstractControl, ValidationErrors,FormGroup,ValidatorFn  } from '@angular/forms';

export class CustomValidator {
    static cannotContainSpaceInStartEnd(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != '' ) {
            if (((control.value as string).charAt(0) == " ") || ((control.value as string).charAt((control.value as string).length - 1) == " ")) {
                return {
                    cannotContainSpaceInStartEnd: true,
                    msg: "shouldn't allow space in start and end."
                }
            }
        }
        return null;
    }

    static stringNumberSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != '' ) {
            if (!(control.value as string).match('^[a-zA-Z0-9 ]+$')) {
                return {
                    stringNumberSpace: true,
                    msg: "only allow alphanumeric."
                }
            }
        }
        return null;
    }   

    static createPasswordStrengthValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
    
            const value = control.value;
    
            if (!value) {
                return null;
            }
    
            const hasUpperCase = /[A-Z]+/.test(value);
    
            const hasLowerCase = /[a-z]+/.test(value);
    
            const hasNumeric = /[0-9]+/.test(value);
    
            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    
            return !passwordValid ? {passwordStrength:true}: null;
        }
    }

    static onlyNumber(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != '' && typeof control.value != 'number' ) {

            if (!(control.value as string).match('^[0-9]+$')) {
                return {
                    onlyNumber: true,
                    msg: "only allow numeric."
                }
            }
        }
        return null;
    }

    
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
        
          //   if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          //     return;
          // }
    
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
          } else {
            matchingControl.setErrors(null);
          }
          return null;
        };
      }

      static mobileNumber(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && control.value != '' && typeof control.value != 'number' ) {

            if (!(control.value as string).match('^[0-9]+$')) {
                return {
                    contactNumberPattern: true,
                    msg: "only allow numeric."
                }
            }

            if ((control.value as string).length != 10) {
                return {
                    contactNumberLength: true,
                    msg: "Mobile no should be 10 digit."
                }
            }
        }
        return null;
    }
    

    
    // static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    //     if (control.value != null) {
    //         if ((control.value as string).indexOf(' ') >= 0) {
    //             return {
    //                 cannotContainSpace: true,
    //                 msg: "space not allowed."
    //             }
    //         }
    //     }
    //     return null;
    // }

    // static allowOneSpace(control: AbstractControl): ValidationErrors | null {
    //     if (control.value != null) {
    //         if ((control.value as string).split(' ').length > 2) {
    //             return {
    //                 allowOneSpace: true,
    //                 allowOneSpacemsg: "allow ony one space."
    //             }
    //         }
    //     }
    //     return null;
    // }

    // static ShouldContainAlphabates(control: AbstractControl): ValidationErrors | null {
    //     if (control.value != null && control.value != "") {
    //         let isCotainCharacter = false;
    //         for (let i = 0; i < (control.value as string).length; i++) {
    //             let c = control.value.charAt(i);
    //             if (((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) && !isCotainCharacter) {
    //                 isCotainCharacter = true;
    //             }
    //         }
    //         if (!isCotainCharacter) {
    //             return {
    //                 ShouldContainAlphabates: true,
    //                 ShouldContainAlphabatesmsg: "should contain alphabates."
    //             }
    //         }
    //     }
    //     return null;
    // }

}
