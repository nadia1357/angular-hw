import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';
import { HomeModule } from './modules/home/home.module';
import { TokenInterceptor } from './core/interceptors/http-interceptors/http.interceptor';

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
    HomeModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
