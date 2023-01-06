import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { selectParams } from 'src/app/models/paramArrays';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Board[] = [];
  private _BOARDS_URL = 'http://localhost:8080/api/boards';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getBoards(selectedParams: selectParams): Observable<Board[]> {
    return this.http.get<Board[]>(this._BOARDS_URL, {
      params: new HttpParams()
        .set('name', selectedParams.name)
        .set('sort', selectedParams.sort)
        .set('order', selectedParams.order)
    });
  }

  getBoardByName(boardId: string) {
    const getBoardURL = this._BOARDS_URL + '/' + boardId;
    return this.http.get<Board>(getBoardURL);
  }

  addNewBoard(board: Board): Observable<unknown> {
    return this.http.post(this._BOARDS_URL, board);
  }

  editBoardName(oldBoardId: string, newBoardName: string): Observable<unknown> {
    const editURL: string = this._BOARDS_URL + '/' + oldBoardId;
    const newBoard: Partial<Board> = { name: newBoardName };
    return this.http.put(editURL, newBoard);
  }

  deleteBoard(oldBoardId: string): Observable<unknown> {
    const deleteURL: string = this._BOARDS_URL + '/' + oldBoardId;
    return this.http.delete(deleteURL);
  }

  updateNumberOfTasks(oldBoardId: string, newNumberOfTasks: number): Observable<unknown> {
    const editURL: string = this._BOARDS_URL + '/' + oldBoardId;
    const newBoard: Partial<Board> = { numberOfTasks: newNumberOfTasks };
    return this.http.put(editURL, newBoard);
  }
}
