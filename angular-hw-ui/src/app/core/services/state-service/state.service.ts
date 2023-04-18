import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Count {
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  boardsCount: Count = { value: 0 };
  boardsCounter = new BehaviorSubject<Count>(this.boardsCount);

  getBoardsCount(): Observable<Count> {
    return this.boardsCounter.asObservable();
  }

  setBoardsCount(newNumberOfBoards: number): void {
    this.boardsCount.value = newNumberOfBoards;
    this.boardsCounter.next(this.boardsCount);
  }
}
