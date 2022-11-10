import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting/sorting.component';
import { FilterPipe } from 'src/app/modules/shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    SortingComponent, FilterPipe
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    SortingComponent
  ]
})
export class SharedModule { }
