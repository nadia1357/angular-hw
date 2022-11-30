import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';

@NgModule({
  declarations: [
    SortingComponent, 
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    SortingComponent
  ]
})
export class SharedModule { }
