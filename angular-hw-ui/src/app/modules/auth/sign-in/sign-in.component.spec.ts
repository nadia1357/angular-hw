import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SignInComponent } from './sign-in.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  
  let jwt_token = 'someToken';

  let authServiceStub: Partial<AuthService> = {
    loginUser: (email: string, password: string) => of(jwt_token)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('numberOfBoards and logOut should be false', () => {
    expect(component.numberOfBoards).toBe(false);
    expect(component.logOut).toBe(false);
  })

  it('#ngOnDestroy, should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    expect(component['destroy$'].complete).toBeTruthy();
  })

  it('#onSubmitLogin, should login the User, and unsubscribe', () => {
    component.onSubmitLogin();
    expect(jwt_token).toBe('someToken');
    expect(component['destroy$'].complete).toBeTruthy(); 
  })
});
