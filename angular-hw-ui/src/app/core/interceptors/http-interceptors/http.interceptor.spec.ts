import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

import { TokenInterceptor } from './http.interceptor';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

describe('TokenInterceptor', () => {
  let jwt_tokenNotNull = 'someToken';

  let authServiceStub: Partial<AuthService> = {
    getUserTokenFromStorage: () => jwt_tokenNotNull
  }

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

  it('should add not null jwt_token', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let jwt_tokenFromStorage: string | null;
      
      if (authServiceStub.getUserTokenFromStorage) {
        jwt_tokenFromStorage = authServiceStub.getUserTokenFromStorage();
        let response;
        const headers = new HttpHeaders();

        http.get('/', { headers }).subscribe(res => response = res);

        const req = httpTestingController.expectOne('/');
        expect(req.request.headers.get('jwt_token')).toBe(jwt_tokenFromStorage)

        req.flush(true);
        httpTestingController.verify();
      }
    }
  ));

  it('should not add null jwt_token', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let jwt_tokenFromStorage: string | null;

      if (!authServiceStub.getUserTokenFromStorage) {
        jwt_tokenFromStorage = null;
        let response;
        const headers = new HttpHeaders();

        http.get('/', { headers }).subscribe(res => response = res);

        const req = httpTestingController.expectOne('/');
        expect(req.request.headers.get('jwt_token')).toBeFalsy();

        req.flush(true);
        httpTestingController.verify();
      }
    }
  ))
});
