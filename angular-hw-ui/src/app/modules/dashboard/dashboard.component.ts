import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/models/board';
import { sortParams, orderParams, selectParams } from 'src/app/models/paramArrays';
import { BoardsService } from 'src/app/core/services/dasboard-service/boards.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public title = 'board';
  boards: Board[] = [];
  searchedBoardName: string = '';
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };
  name: string = '';
  sort: string = 'Date';
  order: string = 'ASC';
  currentOrder: string = 'ASC';

  createNewBoard: boolean = false;
  addBoardForm?: FormGroup;

  editCurrentBoard: boolean = false;
  editBoardForm?: FormGroup;

  deleteCurrentBoard: boolean = false;
  deleteBoardForm?: FormGroup;

  boardsKey: string = 'boards';

  constructor(
    private BoardsService: BoardsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let allBoards: any = localStorage.getItem(this.boardsKey);
    if (allBoards) {
      this.boards = JSON.parse(allBoards);
    } else this.boards = [];

    this.addBoardForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', Validators.required],
    });

    this.editBoardForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  onSubmit(): void {
    let newBoard: Board = this.addBoardForm?.value;
    newBoard.created_at = new Date();
    newBoard.creationDate = formatDate(newBoard.created_at, 'dd/MM/yyyy', 'en');
    newBoard.numberOfTasks = 0;
    newBoard.boardId = newBoard.name; // must be changed later to real ID when using MongoDB
    this.BoardsService.addNewBoard(this.boardsKey, newBoard);
    let allBoards: any = localStorage.getItem('boards');
    this.boards = JSON.parse(allBoards);
    this.addBoardForm?.reset();
    this.createNewBoard = false;
  }

  addNewBoard(): void {
    this.createNewBoard = true;
  }

  onEdit(board: any): void {
    let oldBoardName = board.name;
    let newBoardName = this.editBoardForm?.value.name;
    this.BoardsService.editBoardName(this.boardsKey, oldBoardName, newBoardName);
    let allBoards: any = localStorage.getItem(this.boardsKey);
    this.boards = JSON.parse(allBoards);
    this.editBoardForm?.reset();
    this.editCurrentBoard = false;
  }

  editBoard(): void {
    this.editCurrentBoard = true;
  }

  deleteBoard(board: any): void {
    this.BoardsService.deleteBoard(this.boardsKey, board);
    let allBoards: any = localStorage.getItem(this.boardsKey);
    this.boards = JSON.parse(allBoards);
  }

  changeSortingParams(selectedParams: selectParams) {
    /*if (this.selectedParams.name) {
      this.name = selectedParams.name;
      this.boardFilteredByName = this.boards.find(item => item.name == this.name);
      if (this.boardFilteredByName !== undefined) {
        this.boards = [];
        this.boards.push(this.boardFilteredByName);
      }
    }*/
    if (this.selectedParams.name) {

    }

    this.sort = selectedParams.sort;
    switch (this.sort) {
      case sortParams[0]:
        this.boards.sort((a: any, b: any) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        break;
      case sortParams[1]:
        this.boards.sort((a: any, b: any) => +a.date - +b.date);
        break;
      case sortParams[2]:
        this.boards.sort((a: any, b: any) => a.numberOfTasks - b.numberOfTasks);
        break;
    }

    this.order = selectedParams.order;
    if (this.order === orderParams[1] && this.currentOrder === 'ASC') {
      this.boards.reverse();
      this.currentOrder = 'DESC';
    } else if (this.order === orderParams[0] && this.currentOrder === 'DESC') {
      this.boards.reverse();
      this.currentOrder = 'ASC';
    } else if (this.order === orderParams[1] && this.currentOrder === 'DESC') {
      this.currentOrder = 'DESC';
    }
    else if (this.order === orderParams[0] && this.currentOrder === 'ASC') {
      this.currentOrder = 'ASC';
    }
  }
}