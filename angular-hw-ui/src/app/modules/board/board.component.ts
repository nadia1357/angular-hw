import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { faTrashCan, faComment, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

import { Task } from 'src/app/models/task';
import { SelectParams, colors } from 'src/app/models/paramArrays';
import { BoardsService } from 'src/app/core/services/board-service/boards.service';
import { TasksService } from 'src/app/core/services/task-service/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  logOut: boolean = true;
  numberOfBoards: boolean = true;

  private routeSub!: Subscription;
  public boardId: string = '';

  faTrashCan = faTrashCan;
  faComment = faComment;
  faPenToSquare = faPenToSquare;
  faBoxArchive = faBoxArchive;

  public title = 'task';
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  archivedTasks: Task[] = [];
  colors: string[] = colors;

  private colorNumber: number = 0;
  public currentColumn: string = '';
  public todoCurrentColor: string = 'red-violet-crayola';
  public inProgressCurrentColor: string = 'pastel-pink';
  public doneCurrentColor: string = 'magic-mint';
  public archivedCurrentColor: string = 'wild-orchid';

  taskId: string = '';
  taskToComment: string = '';
  searchedTaskName: string = '';
  selectedParams: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

  name: string = '';
  sort: string = 'Date';
  order: string = 'ASC';
  currentOrder: string = 'ASC';

  createNewTaskToDo: boolean = false;
  createNewTaskInProgress: boolean = false;
  createNewTaskDone: boolean = false;
  createNewTaskArchived: boolean = false;
  addTaskForm?: FormGroup;

  editCurrentTaskToDo: boolean = false;
  editCurrentTaskInProgress: boolean = false;
  editCurrentTaskDone: boolean = false;
  editCurrentTaskArchived: boolean = false;
  editTaskForm?: FormGroup;

  showArchivedTasks: boolean = false;
  numberOfTasks: number = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private tasksService: TasksService,
    private boardsService: BoardsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.boardId = params['id']; // board's id
    });
  }

  ngOnInit(): void {
    this.refreshTasks();

    this.addTaskForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });

    this.editTaskForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.changeTaskStatus(event.container.data[event.currentIndex], event.container.id);            
    }
  }

  changeColumnColor(colorNumber: number, currentColumn: string) {
    this.colorNumber = colorNumber;
    this.currentColumn = currentColumn;
  }

  getColorValue(thatColumn: string): any {
    if (thatColumn === this.currentColumn) {
      switch (this.currentColumn) {
        case ('todo'):
          this.todoCurrentColor = colors[this.colorNumber];
          return this.todoCurrentColor;
        case ('inProgress'):
          this.inProgressCurrentColor = colors[this.colorNumber];
          return this.inProgressCurrentColor;
        case ('done'):
          this.doneCurrentColor = colors[this.colorNumber];
          return this.doneCurrentColor;
        case ('archived'):
          this.archivedCurrentColor = colors[this.colorNumber];
          return this.archivedCurrentColor;
      }
    }
  }

  onSubmit(column: string): void {
    let newTask: Partial<Task> = this.addTaskForm?.value;
    newTask.boardId = this.boardId;
    newTask.status = column;
    this.tasksService.addNewTask(newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.refreshTasks();
          this.numberOfTasks = this.tasks.length;
          this.boardsService.updateNumberOfTasks(this.boardId, this.numberOfTasks);
        },
        error: () => alert('This task wasn`t created. Please try again')
      });

    this.addTaskForm?.reset();
    this.createNewTaskToDo = false;
    this.createNewTaskInProgress = false;
    this.createNewTaskDone = false;
    this.createNewTaskArchived = false;
  }

  addNewTask(column: string): void {
    switch (column) {
      case 'todo':
        this.createNewTaskToDo = true;
        break;
      case 'inProgress':
        this.createNewTaskInProgress = true;
        break;
      case 'done':
        this.createNewTaskDone = true;
        break;
      case 'archived':
        this.createNewTaskArchived = true;
        break;
    }
  }

  onEdit(): void {
    let newTask: Partial<Task> = { name: this.editTaskForm?.value.name };
    this.tasksService.editTask(this.taskId, newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshTasks(),
        error: () => alert('The task name wasn`t changed. Please try again')
      });

    this.editTaskForm?.reset();
    this.editCurrentTaskToDo = false;
    this.editCurrentTaskInProgress = false;
    this.editCurrentTaskDone = false;
    this.editCurrentTaskArchived = false;
  }

  editTask(task: Task, column: string): void {
    switch (column) {
      case 'todo':
        this.editCurrentTaskToDo = true;
        break;
      case 'inProgress':
        this.editCurrentTaskInProgress = true;
        break;
      case 'done':
        this.editCurrentTaskDone = true;
        break;
      case 'archived':
        this.editCurrentTaskArchived = true;
    }
    this.taskId = task._id;
  }

  deleteTask(task: Task): void {
    this.taskId = task._id;
    this.tasksService.deleteTask(this.taskId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.refreshTasks();
          this.numberOfTasks = this.tasks.length;
          this.boardsService.updateNumberOfTasks(this.boardId, this.numberOfTasks);
        },
        error: () => alert('The task wasn`t deleted. Please try again')
      });
  }

  archiveTask(task: Task): void {
    this.tasksService.archiveTask(task._id)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshTasks(),
        error: () => alert('The task wasn`t archived. Please try again')
      });
    this.showArchivedTasks = true;
  }

  changeTaskStatus(task: Task, newStatus: string): void {
    let newTask: Partial<Task> = { status: newStatus };
    this.tasksService.editTask(task._id, newTask)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => this.refreshTasks(),
        error: () => alert('The task status wasn`t changed. Please try again')
      });
  }

  hideArchivedTasks(): void {
    this.showArchivedTasks = false;
  }

  changeSortingParams(selectedParams: SelectParams) {
    this.selectedParams = selectedParams;
    this.refreshTasks();
  }

  private refreshTasks(): any {
    this.tasksService.getTasks(this.selectedParams, this.boardId)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((tasks) => {
        this.tasks = tasks;
        this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
        this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
        this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
        this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');
      });
  }
}
