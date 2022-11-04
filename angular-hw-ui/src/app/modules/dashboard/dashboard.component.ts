import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/models/board';
import { sortParams, orderParams, selectParams } from 'src/app/models/paramArrays';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public title = 'board';
  boards: Board[] = [];
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };
  boardFilteredByName: Board | undefined = {
    name: '',
    date: new Date(),
    creationDate: '',
    description: '',
    numberOfTasks: 0
  };
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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
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
    newBoard.date = new Date();
    newBoard.creationDate = formatDate(newBoard.date, 'dd/MM/yyyy', 'en');
    this.boards.push(newBoard);
    this.addBoardForm?.reset();
    this.createNewBoard = false;
  }

  addNewBoard(): void {
    this.createNewBoard = true;
  }

  onEdit(board: { name: any; }): void {
    board.name = this.editBoardForm?.value.name;
    this.editBoardForm?.reset();
    this.editCurrentBoard = false;
  }

  editBoard(): void {
    this.editCurrentBoard = true;
  }

  deleteBoard(board: { name: any; }, boards: any): any {
    let deleteIndex = boards.findIndex((item: any) => item.name == board.name);
    boards.splice(deleteIndex, 1);
    return boards;
  }

  goToBoard(): void { }

  changeSortingParams(selectedParams: selectParams) {
    if (this.selectedParams.name) {
      this.name = selectedParams.name;
      this.boardFilteredByName = this.boards.find(item => item.name == this.name);
    }

    this.sort = selectedParams.sort;
    switch (this.sort) {
      case sortParams[0]:
        this.boards.sort();
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
    }
  }
}