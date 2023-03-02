import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TaskRoutingModule,
    SharedModule
  ]
})
export class TaskModule { }
