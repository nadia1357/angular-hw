import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormatPipe } from 'src/app/core/pipes/format.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    FormatPipe
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
