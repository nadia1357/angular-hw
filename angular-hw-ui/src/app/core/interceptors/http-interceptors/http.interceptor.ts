import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/core/services/home-service/home.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private homeService: HomeService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.homeService.getUserTokenFromStorage();
    if (token) {
      const headerReq = request.clone({
        headers: request.headers.set(
          'jwt_token', token
        )
      });
      return next.handle(headerReq);
    } else {
      return next.handle(request);
    }
  }
}
