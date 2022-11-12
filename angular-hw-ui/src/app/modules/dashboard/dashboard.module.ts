import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchPipe } from '../../core/pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    SearchPipe
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
