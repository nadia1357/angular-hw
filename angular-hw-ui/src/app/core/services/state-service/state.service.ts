import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Count {
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private boardsCount: Count = { value: 0 };
  private boardsCounter = new BehaviorSubject<Count>(this.boardsCount);

  getBoardsCount(): Observable<Count> {
    return this.boardsCounter.asObservable();
  }

  setBoardsCount(newNumberOfBoards: number): void {
    this.boardsCounter.next({ value: newNumberOfBoards });
  }
}
