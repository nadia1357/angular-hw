import { Input, Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { StateService } from 'src/app/core/services/state-service/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() numberOfBoards = true;
  @Input() logOut = true;

  currentBoardsCount: number = 0;
  subscriptionBoardsCounter: any;

  constructor(
    private authService: AuthService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.subscriptionBoardsCounter = this.stateService.getBoardsCount().subscribe(
      res => this.currentBoardsCount = res.value
    );
  }

  ngOnDestroy(): void {
    this.subscriptionBoardsCounter.unsubscribe();
  }

  logout() {
    this.authService.setUserTokenToStorage('');
    this.subscriptionBoardsCounter.unsubscribe();
    this.currentBoardsCount = 0;
  }
}
