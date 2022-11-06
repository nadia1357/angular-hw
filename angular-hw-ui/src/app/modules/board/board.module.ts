import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BoardModule { }
