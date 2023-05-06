import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { HeaderStubComponent, FooterStubComponent } from 'src/app/stubs/stubs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  let jwt_token: string = 'someToken';

  let authServiceStub: Partial<AuthService> = {
    changePassword: (email: string, password: string) => of(jwt_token)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent, HeaderStubComponent, FooterStubComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('numberOfBoards and logOut should be false', () => {
    expect(component.numberOfBoards).toBe(false);
    expect(component.logOut).toBe(false);
  });

  it('#ngOnDestroy, should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    expect(component['destroy$'].complete).toBeTruthy();
  });

  it('#onSubmitSetNewPassword, should set new password, and unsubscribe', () => {
    component.onSubmitSetNewPassword();
    expect(jwt_token).toBe('someToken');
    expect(component['destroy$'].complete).toBeTruthy(); 
  })
});
