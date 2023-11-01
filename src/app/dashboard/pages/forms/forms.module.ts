import { NgModule } from '@angular/core';
import { FormsComponent } from './forms.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FormsComponent
  ]
})
export class FormsModule { }
