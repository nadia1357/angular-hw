import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { Count, StateService } from 'src/app/core/services/state-service/state.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let boardsCount: Count = { value: 1 };
  let tokenFromStorage = 'someToken'
  let token: string = '';

  let authServiceStub: Partial<AuthService> = {
    setUserTokenToStorage: (token) => {
      tokenFromStorage = token;
    }
  }

  let stateServiceStub: Partial<StateService> = {
    getBoardsCount: () => of(boardsCount)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: StateService, useValue: stateServiceStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#OnInit, should set currentBoardsCount in OnInit, @Input numberOfBoards should be true, @Input logOut should be true', () => {
    component.ngOnInit();
    expect(component.currentBoardsCount).toBe(1);
    expect(component.numberOfBoards).toBe(true);
    expect(component.logOut).toBe(true);
  });

  it('#OnDestroy, should unsubscribe on destroy', () => {
    component['subscriptionBoardsCounter'] = of(true).subscribe();
    component.ngOnDestroy();
    expect(component['subscriptionBoardsCounter'].closed).toBeTruthy();
  });

  it('#logout, should set a token in LocalStorage to ``, unsubscribe, set currentBoardsCount to 0', () => {
    component['subscriptionBoardsCounter'] = of(true).subscribe();
    component.logout();
    expect(tokenFromStorage).toBe(token);
    expect(component['subscriptionBoardsCounter'].closed).toBeTruthy();
    expect(component.currentBoardsCount).toBe(0);
  });
});
