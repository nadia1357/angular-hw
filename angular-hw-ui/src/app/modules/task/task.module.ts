import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskComponent } from './task.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchCommentPipe } from 'src/app/core/pipes/search-comment.pipe';

@NgModule({
  declarations: [
    TaskComponent,
    SearchCommentPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class TaskModule { }
