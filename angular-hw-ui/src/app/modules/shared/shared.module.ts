import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule} from 'src/app/app-routing.module';
import { SortingComponent } from './sorting/sorting.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    SortingComponent,
    HeaderComponent,
    FooterComponent, 
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    AppRoutingModule
  ],
  exports: [
    SortingComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
