import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { SortingComponent } from './sorting/sorting.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    SortingComponent,
    NavigationComponent, 
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    AppRoutingModule
  ],
  exports: [
    SortingComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
