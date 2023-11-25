import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class MaterialModule { }
