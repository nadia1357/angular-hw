import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchPipe } from '../../core/pipes/search.pipe';

@NgModule({
  declarations: [
    BoardComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class BoardModule { }
