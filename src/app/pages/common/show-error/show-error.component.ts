import { Component, OnInit,Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html'
})
export class ShowErrorComponent implements OnInit {  

  @Input() name?: string;  
  @Input() cname?: string;
  fieldData?: AbstractControl | null;

  @Input()
  set field(field: AbstractControl | null) {    
    this.fieldData = field;    
  }   

  constructor() { }


  ngOnInit(): void {
  }

}
