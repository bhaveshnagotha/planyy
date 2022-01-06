import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ShowErrorModule } from 'src/app/pages/common/show-error/show-error.module';

@NgModule({
    exports: [
        CommonModule,        
        FormsModule,
        ReactiveFormsModule,
        ShowErrorModule,
    ],
    providers:[]
})
export class SharedModule { }