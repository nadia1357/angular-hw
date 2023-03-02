import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DragDropModule,
    BoardRoutingModule,
    SharedModule
  ]
})
export class BoardModule { }
