import { Component, OnDestroy } from '@angular/core';
import { HomeService } from 'src/app/core/services/home-service/home.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  email = '';
  password = '';

  private readonly destroy$ = new Subject<void>();

  constructor(private homeService: HomeService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitLogin() {
    this.homeService.loginUser(this.email, this.password)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }

  onSubmitRegister() {
    this.homeService.registerUser(this.email, this.password)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }

  onSubmitForgetPassword() {
    this.homeService.changePassword(this.email);
  }
}
