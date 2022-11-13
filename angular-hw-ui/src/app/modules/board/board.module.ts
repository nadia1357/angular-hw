import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchTaskPipe } from 'src/app/app/core/pipes/search-task.pipe';

@NgModule({
  declarations: [
    BoardComponent,
    SearchTaskPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class BoardModule { }
