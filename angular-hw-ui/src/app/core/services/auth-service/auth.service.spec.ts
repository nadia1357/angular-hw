import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { usersMock, newUserMock } from 'src/app/mocks/users-mock';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  const jwt_token = 'someToken';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'put']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    service = new AuthService(httpClientSpy, routerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setUserTokenToStorage', () => {
    it('should set the user`s token to localstorage', () => {
      const token: string = usersMock[0].token; // we choose the token for testing
      service.setUserTokenToStorage(token);
      const tokenFromStorage: string | null = service.getUserTokenFromStorage();
      if (tokenFromStorage) {
        expect(tokenFromStorage).toBe(token);
      }
    });
  })

  describe('#getUserTokenFromStorage', () => {
    it('should return the user`s token from localstorage if token !== null', () => {
      const token: string = usersMock[0].token; // we choose the token for testing
      service.setUserTokenToStorage(token);
      const tokenFromStorage: string | null = service.getUserTokenFromStorage();
      if (tokenFromStorage) {
        expect(tokenFromStorage).toBe(token);
      }
    });

    it('should return null if token == null', () => {
      localStorage.removeItem('token');
      const tokenFromStorage: string | null = service.getUserTokenFromStorage();
      expect(tokenFromStorage).toBeNull();
    });
  })

  describe('#loginUser', () => {
    it('#loginUser should send user`s email and password correctly', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: usersMock[0].token}));

      service.loginUser(usersMock[0].email, usersMock[0].password)
        .subscribe({
          next: token => {
            expect(token).toBeTruthy();
            done();
          },
          error: done.fail
        });
    });

    it('#loginUser should place user`s token to local storage', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: usersMock[0].token}));

      service.loginUser(usersMock[0].email, usersMock[0].password)
        .subscribe({
          next: () => {
            const localStorageItem = localStorage.getItem('token');
            expect(localStorageItem).not.toBeNull();
            done();
          },
          error: done.fail
        });
    });

    it('#loginUser should navigate to the dashboard page', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: usersMock[0].token}));

      service.loginUser(usersMock[0].email, usersMock[0].password)
        .subscribe({
          next: () => {
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
            done();
          },
          error: done.fail
        });
    });
  })

  describe('#registerUser', () => {
    it('#registerUser should send new user`s email and password correctly', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: newUserMock.token}));

      service.registerUser(newUserMock.email, newUserMock.password)
        .subscribe({
          next: token => {
            expect(token).toBeTruthy();
            done();
          },
          error: done.fail
        });
    });

    it('#registerUser should place user`s token to local storage', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: newUserMock.token}));

      service.registerUser(newUserMock.email, newUserMock.password)
        .subscribe({
          next: () => {
            const localStorageItem = localStorage.getItem('token');
            expect(localStorageItem).not.toBeNull();
            done();
          },
          error: done.fail
        });
    });

    it('#registerUser should navigate to the dashboard page', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of({jwt_token: newUserMock.token}));

      service.registerUser(newUserMock.email, newUserMock.password)
        .subscribe({
          next: () => {
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
            done();
          },
          error: done.fail
        });
    });
  })

  describe('#changePassword', () => {
    it('#changePassword should send user`s email and new password correctly', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({jwt_token: 'new_token'}));

      service.changePassword(usersMock[1].email, 'new_password')
        .subscribe({
          next: token => {
            expect(token).toBeTruthy();
            done();
          },
          error: done.fail
        });
    });

    it('#changePassword should place user`s token to local storage', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({jwt_token: 'new_token'}));

      service.changePassword(usersMock[1].email, 'new_password')
        .subscribe({
          next: () => {
            const localStorageItem = localStorage.getItem('token');
            expect(localStorageItem).not.toBeNull();
            done();
          },
          error: done.fail
        });
    });

    it('#changePassword should navigate to the dashboard page', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({jwt_token: 'new_token'}));

      service.changePassword(usersMock[1].email, 'new_password')
        .subscribe({
          next: () => {
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
            done();
          },
          error: done.fail
        });
    });
  })
})
