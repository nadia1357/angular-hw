import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/models/board';
import { sortParams, orderParams, sorts, orders } from 'src/app/models/paramArrays';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public title = 'board';
  boards: Board[] = [];
  sort: sorts = 'Date';
  order: orders = 'ASC';
  currentOrder: orders = 'ASC';

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

  goToBoard(): void {

  }

  changeSort(newSort: sorts) {
    this.sort = newSort;
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
  }

  changeOrder(newOrder: orders) {
    this.order = newOrder;
    if (this.order === orderParams[1] && this.currentOrder === 'ASC') {
      this.boards.reverse();
      this.currentOrder = 'DESC';
    } else if (this.order === orderParams[0] && this.currentOrder === 'DESC') {
      this.boards.reverse();
      this.currentOrder = 'ASC';
    }
  }
}