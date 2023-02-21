import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {
logOut: boolean = false;

  email = '';
  password = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitRegister() {
    this.authService.registerUser(this.email, this.password)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }
}

