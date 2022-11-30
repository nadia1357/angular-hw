import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BoardModule,
    TaskModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
