import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenInterceptor } from './http.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
  });

  it('should add Content-type header', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();

      http.get('/', { headers }).subscribe(res => response = res);

      const req = httpTestingController.expectOne('/');
      expect(req.request.headers.get('Content-type')).toBeTruthy();

      req.flush(true);
      httpTestingController.verify();
    }
  ));

  it('should add Content-type as "application/json"', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();

      http.get('/', { headers }).subscribe(res => response = res);

      const req = httpTestingController.expectOne('/');
      expect(req.request.headers.get('Content-type')).toBe('application/json')

      req.flush(true);
      httpTestingController.verify();
    }
  ));
});

