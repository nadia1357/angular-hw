import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenInterceptor } from './http.interceptor';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

describe('TokenInterceptor', () => {
  describe('should add jwt_token header if jwt_token !== null', () => {
    let authServiceStub: Partial<AuthService> = {
      getUserTokenFromStorage: () => 'someToken'
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
          { provide: AuthService, useValue: authServiceStub }
        ],
      });
    });

    it('should add jwt_token header if jwt_token !== null', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpTestingController: HttpTestingController) => {
        let response;
        const headers = new HttpHeaders();

        http.get('/', { headers }).subscribe(res => response = res);

        const req = httpTestingController.expectOne('/');
        expect(req.request.headers.get('jwt_token')).toBeTruthy();

        req.flush(true);
        httpTestingController.verify();
      }
    ));
  });

  describe('should not add jwt_token header if jwt_token == null', () => {
    let authServiceStub: Partial<AuthService> = {
      getUserTokenFromStorage: () => null
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
          { provide: AuthService, useValue: authServiceStub }
        ],
      });
    });

  it('should not add null jwt_token', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();

      http.get('/', { headers }).subscribe(res => response = res);

      const req = httpTestingController.expectOne('/');
      expect(req.request.headers.get('jwt_token')).toBeNull();

      req.flush(true);
      httpTestingController.verify();
    }
  ))
});
});
