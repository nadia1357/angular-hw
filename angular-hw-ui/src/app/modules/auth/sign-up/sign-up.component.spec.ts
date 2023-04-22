import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let jwt_token: string = 'someToken';

  let authServiceStub: Partial<AuthService> = {
    registerUser: (email: string, password: string) => of(jwt_token)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('numberOfBoards and logOut should be false', () => {
    expect(component.numberOfBoards).toBe(false);
    expect(component.logOut).toBe(false);
  })

  it('#ngOnDestroy, should unsubscribe on destroy', () => {
    component.ngOnDestroy();
    expect(component['destroy$'].complete).toBeTruthy();
  })

  it('#onSubmitRegister, should register the User, and unsubscribe', () => {
    component.onSubmitRegister();
    expect(jwt_token).toBe('someToken');
    expect(component['destroy$'].complete).toBeTruthy(); 
  })
});
