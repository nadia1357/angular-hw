import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    RouterModule
  ],
  exports: [
    SortingComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
