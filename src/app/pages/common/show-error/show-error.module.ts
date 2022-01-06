import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorComponent } from './show-error.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports:[ShowErrorComponent],
  declarations: [ShowErrorComponent]
})
export class ShowErrorModule { }

