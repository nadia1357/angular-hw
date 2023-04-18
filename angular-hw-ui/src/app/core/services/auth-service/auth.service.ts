import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _URL = 'http://localhost:8080/api/auth';
  private _LOGIN_URL = `${this._URL}/login`;
  private _REGISTER_URL = `${this._URL}/register`;
  private _FORGOT_PASSWORD_URL = `${this._URL}/forgot_password`;

  constructor(private http: HttpClient,
    private router: Router) { }

  public setUserTokenToStorage(token: string) {
    const json = JSON.stringify(token);
    localStorage.setItem('token', json);
  }

  public getUserTokenFromStorage(): string | null {
    const item = localStorage.getItem('token');
    if (item) {
      return (JSON.parse(item));
    }
    return null;
  }

  loginUser(email: string, password: string): Observable<unknown> {
    return this.http.post<{
      jwt_token: string
    }>(this._LOGIN_URL, { email, password })
      .pipe(
        tap(({ jwt_token: token }) => {
          if ({ jwt_token: token }) {
            this.setUserTokenToStorage(token);
            this.router.navigate(['/dashboard']);
          } else {
            alert('You should register');
          }
        })
      );
  }

  registerUser(email: string, password: string): Observable<unknown> {
    return this.http.post<{
      jwt_token: string
    }>(this._REGISTER_URL, { email, password })
      .pipe(
        tap(({ jwt_token: token }) => {
          this.setUserTokenToStorage(token);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  changePassword(email: string, password: string): Observable<unknown> {
    return this.http.put<{
      jwt_token: string
    }>(this._FORGOT_PASSWORD_URL, { email, password })
      .pipe(
        tap(({ jwt_token: token }) => {
          this.setUserTokenToStorage(token);
          this.router.navigate(['/dashboard']);
        })
      );
  }
}
