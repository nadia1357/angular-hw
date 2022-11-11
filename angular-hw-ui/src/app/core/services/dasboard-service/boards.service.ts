import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Board } from 'src/app/models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Board[] = [];

  constructor(private http: HttpClient) { }

  getBoards(boardsKey: string) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    return this.boards;
  }

  getBoardByName(boardsKey: string, boardName: string) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let board: any = this.boards.find((item: any) => item.name === boardName);
    this.boards = [];
    this.boards.push(board);
    return this.boards;
  }

  addNewBoard(boardsKey: string, board: any) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    this.boards.push(board);
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
    return this.boards;
  }

  editBoardName(boardsKey: string, boardId: any, newBoardName: string) {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let board: any;
    for (board in this.boards) {
      if (board.boardId === boardId) {
        board.name = newBoardName;
      }
    }
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
    return this.boards;
  }

  deleteBoard(boardsKey: string, board: { name: any; }): any {
    let boardsFromLocalStorage = localStorage.getItem(boardsKey);
    if (boardsFromLocalStorage) {
      this.boards = JSON.parse(boardsFromLocalStorage);
    } else this.boards = [];
    let deleteIndex = this.boards.findIndex((item: any) => item.name == board.name);
    this.boards.splice(deleteIndex, 1);
    localStorage.setItem(boardsKey, JSON.stringify(this.boards));
    return this.boards;
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
    return this.boards;
  }
}
