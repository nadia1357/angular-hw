import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { TokenInterceptor } from './core/interceptors/http-interceptors/http.interceptor';
import { HighlightDirective } from './core/directives/highlight.directive';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    RouterModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
