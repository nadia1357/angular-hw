import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BoardComponent } from './modules/board/board.component';
import { BoardModule } from './modules/board/board.module';

const appRoutes = [
  {path: '', component: DashboardComponent},
  {path: 'board', component: BoardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    DashboardModule,
    BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
