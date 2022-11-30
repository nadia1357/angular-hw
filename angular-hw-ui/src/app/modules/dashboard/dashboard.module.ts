import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { SearchPipe } from '../../core/pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
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
