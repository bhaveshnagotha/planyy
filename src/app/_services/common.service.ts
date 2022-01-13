import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonApiService } from './commonapi.service';
import { ToastrService } from 'ngx-toastr';
import { toasterType } from 'src/app/_files/toast-type';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(public commonApiService: CommonApiService, private toastrService: ToastrService) { }

  toastType = toasterType;  

  setEditData(form:any, editData:any) {
    for (const key of Object.keys(form.controls)) {
      if (editData instanceof Array) {
        if (form.controls[key] instanceof FormControl) {
          form.controls[key].setValue(editData[0][key] == 'null' ? editData[0][key] : editData[0][key]);
        }
      }
      else if (editData instanceof Object) {
        if (form.controls[key] instanceof FormControl) {

          if (String(editData[key]).includes('T') && String(editData[key]).indexOf('T') == 10) {

            form.controls[key].setValue(this.setDateFormatDDMMYYYY(String(editData[key]).split('T')[0]));
          }
          else {
            form.controls[key].setValue(editData[key] == 'null' ? null : editData[key]);
          }


        }
      }
    }
  }

  markAsTouched(form : any){
    for (const key of Object.keys(form.controls)) {
      form.controls[key].markAsTouched();        
    }     
  }

  toastMSG(type:any, MSG:any) {

    if (type == toasterType.info) {
      this.toastrService.info(MSG);
    }

    if (type == toasterType.success) {
      this.toastrService.success(MSG);
    }

    if (type == toasterType.warning) {
      this.toastrService.warning(MSG);
    }

    if (type == toasterType.error) {
      this.toastrService.error(MSG);
    }
  }


  validationCheck(field:any, mode = 'Add'):any {

    if (field.errors && (field.dirty || mode == 'Edit' || field.touched)) {
      return 'is-invalid';
    }

    if (field.valid && (mode == 'Edit' || field.touched)) {
      return 'is-valid';
    }

    if (field.errors && !field.touched) {

      if (field.errors.required) {
        return 'lbl-mandatory';
      }

    }

  }
  drpValidationCheck(field:any, mode = 'Add'):any {

    if (field.errors && (field.dirty || mode == 'Edit' || field.touched)) {
      return 'drp-error';
    }

    if (field.valid && (mode == 'Edit' || field.touched)) {
      return 'drp-success';
    }

    if (field.errors && !field.touched) {

      if (field.errors.required) {
        return 'lbl-mandatory';
      }

    }

  }

  // Sweet Alert Start
  confirmMsg(textMsg: any, titleMsg = '', confirmbuttonText = 'Confirm', cancelbuttonText = 'Cancel') {
    return Swal.fire({
      title: titleMsg !== '' ? titleMsg : 'Are you sure?',
      text: textMsg,
      showCancelButton: true,
      confirmButtonText: confirmbuttonText,
      cancelButtonText: cancelbuttonText
    })
  }

  // Sweet Alert End

  deleteRecord(controllerName:any, Id:number) {
    this.confirmMsg("You won't be able to revert this!", "Are you sure ?", "Yes, delete it!").then((result) => {
      if (result.value) {
        this.commonApiService.deleteRequest(controllerName + "/Delete/" + Id).subscribe((response) => {
          if (response) {
            this.toastMSG(this.toastType.success, "test");
            this.commonApiService.reloadList.next(!this.commonApiService.reloadList.value);
          }
        })
      }
    });
  }

  updateStatus(controllerName:any, Id:number, status = null) {
    this.confirmMsg("You want update status !", "Are you sure ?", "Yes !").then((result) => {
      if (result.value) {
        this.commonApiService.putRequest(controllerName + "/UpdateStatus/" + Id + "," + status).subscribe((response) => {
          if (response) {
            this.commonApiService.reloadList.next(!this.commonApiService.reloadList.value);
          }
        })
      }
    });
  }


  downloadFile(response:any, fileName:any) {

    if (response && fileName) {
      let blob = new Blob([response], { type: response.type });
      var downloadURL = window.URL.createObjectURL(response);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();
    }

  }

  setDateFormatYYYYMMDD(date:any) {
    return moment(date).format('yyyy-MM-DD');
  }

  setDateFormatDDMMYYYY(date:any) {
    return moment(date).format('DD-MM-yyyy');
  }



    //The set method is use for encrypt the value.
    set(keys:any, value:any){
      var key = CryptoJS.enc.Utf8.parse(keys);
      var iv = CryptoJS.enc.Utf8.parse(keys);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
  
      return encrypted.toString();
    }


     //The get method is use for decrypt the value.
    get(keys:any, value:any){
      var key = CryptoJS.enc.Utf8.parse(keys);
      var iv = CryptoJS.enc.Utf8.parse(keys);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    }
}