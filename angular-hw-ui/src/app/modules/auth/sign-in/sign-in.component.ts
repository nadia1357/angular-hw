import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {
  numberOfBoards: boolean = false;
  logOut: boolean = false;
  
  email = '';
  password = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitLogin() {
    this.authService.loginUser(this.email, this.password)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  } 
}
