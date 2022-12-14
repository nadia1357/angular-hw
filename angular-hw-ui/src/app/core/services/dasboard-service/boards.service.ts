import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/models/board';

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

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this._BOARDS_URL);
  }

  getBoardByName(boardName: string) {
    
    /*let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let board: any = this.boards.find((item: any) => item.name === boardName);
    this.boards = [];
    this.boards.push(board);*/
  }

  addNewBoard(board: Board): Observable<unknown> {
    return this.http.post(this._BOARDS_URL, board);
  }

  editBoardName(boardsKey: string, oldBoardName: string, newBoardName: string) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    this.boards.forEach((board, index) => {
      if (board.name === oldBoardName) {
        this.boards[index].name = newBoardName;
      }
    });
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
  }

  deleteBoard(boardsKey: string, board: { name: any; }): any {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let deleteIndex = this.boards.findIndex((item: any) => item.name == board.name);
    this.boards.splice(deleteIndex, 1);
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
  }

  updateNumberOfTasks(boardsKey: string, boardId: any, newNumberOfTasks: number) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let board: any;
    for (board in this.boards) {
      if (board.boardId === boardId) {
        board.numberOfTasks = newNumberOfTasks;
      }
    }
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
  }
}
