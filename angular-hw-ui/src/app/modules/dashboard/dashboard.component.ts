import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Board } from 'src/app/models/board';
import { SelectParams } from 'src/app/models/paramArrays';
import { BoardsService } from 'src/app/core/services/board-service/boards.service';
import { StateService } from 'src/app/core/services/state-service/state.service';
import { ValidateDescription } from 'src/app/core/custom_validators/custom_validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  logOut: boolean = true;
  numberOfBoards: boolean = true;

  currentBoardsCount: number = 0;
  subscriptionBoardsCounter: any;

  public title = 'board';
  boards: Board[] = [];
  currentBoardId: string = '';
  oldBoardId: string = '';
  selectedParams: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

  createNewBoard: boolean = false;
  addBoardForm?: FormGroup;

  editCurrentBoard: boolean = false;
  editBoardForm?: FormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private boardsService: BoardsService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscriptionBoardsCounter = this.stateService.getBoardsCount().subscribe(
      res => this.currentBoardsCount = res.value
    );

    this.refreshBoards();

    this.addBoardForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(5),
        ValidateDescription()// custom validation
      ]]
    });

    this.editBoardForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
      ]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptionBoardsCounter.unsubscribe();
  }

  onSubmit(): void {
    let newBoard: Board = this.addBoardForm?.value;
    newBoard.created_at = new Date();
    newBoard.creationDate = formatDate(newBoard.created_at, 'dd/MM/yyyy', 'en');
    newBoard.numberOfTasks = 0;
    newBoard._id = '';
    this.boardsService.addNewBoard(newBoard)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshBoards(),
        error: () => alert('This board wasn`t created. Please try again')
      });

    this.addBoardForm?.reset();
    this.createNewBoard = false;
  }

  addNewBoard(): void {
    this.createNewBoard = true;
  }

  onEdit(): void {
    let newBoardName = this.editBoardForm?.value.name;
    this.boardsService.editBoardName(this.oldBoardId, newBoardName)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshBoards(),
        error: () => alert('The board name wasn`t changed. Please try again')
      });

    this.editBoardForm?.reset();
    this.editCurrentBoard = false;
  }

  editBoard(board: Board): void {
    this.editCurrentBoard = true;
    this.oldBoardId = board._id;
  }

  deleteBoard(board: Board): void {
    this.oldBoardId = board._id;
    this.boardsService.deleteBoard(this.oldBoardId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshBoards(),
        error: () => alert('The board wasn`t deleted. Please try again')
      });
  }

  throwBoardId(board: Board): void {
    this.currentBoardId = board._id;
  }

  changeSortingParams(selectedParams: SelectParams) {
    this.selectedParams = selectedParams;
    this.refreshBoards();
  }

  private refreshBoards(): any {
    this.boardsService.getBoards(this.selectedParams)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((boards) => {
        this.boards = boards;
        this.stateService.setBoardsCount(boards.length);
      });
  }
}
