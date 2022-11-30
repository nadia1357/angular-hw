import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { BoardComponent } from './board.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchTaskPipe } from 'src/app/core/pipes/search-task.pipe';

@NgModule({
  declarations: [
    BoardComponent,
    SearchTaskPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DragDropModule
  ]
})
export class BoardModule { }
