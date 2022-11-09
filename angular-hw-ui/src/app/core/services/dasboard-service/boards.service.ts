import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get('assets/boards.json')
  }

  getBoardByName() {

  }

  editBoardName() {

  }

  deleteBoard() {

  }

  updateNumberOfTasks() {

  }


}
