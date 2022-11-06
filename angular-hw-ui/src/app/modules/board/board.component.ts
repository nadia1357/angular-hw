import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /*changeSortingParams(selectedParams: selectParams) {
    if (this.selectedParams.name) {
      this.name = selectedParams.name;
      this.boardFilteredByName = this.boards.find(item => item.name == this.name);
      if (this.boardFilteredByName !== undefined) {
        this.boards = [];
        this.boards.push(this.boardFilteredByName);
      }
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
  }*/
}
