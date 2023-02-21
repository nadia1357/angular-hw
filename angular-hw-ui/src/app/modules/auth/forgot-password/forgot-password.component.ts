import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {
  logOut: boolean = false;

  email = '';
  password = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitSetNewPassword() {
    this.authService.changePassword(this.email, this.password)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }
}

