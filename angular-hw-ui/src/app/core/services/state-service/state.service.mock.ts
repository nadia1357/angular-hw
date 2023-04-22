import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Count {
  value: number;
}

@Injectable()
export class StateServiceMock {
  boardsCount: Count = { value: 1 };

  getBoardsCount(): Observable<Count> {
    return of(this.boardsCount);
  }

  setBoardsCount(newNumberOfBoards: number): void {
    this.boardsCount.value = newNumberOfBoards;
  }
}