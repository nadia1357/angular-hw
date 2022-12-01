import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { faTrashCan, faComment, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { Board } from 'src/app/models/board';
import { Task } from 'src/app/models/task';
import { sortParams, orderParams, selectParams, colors } from 'src/app/models/paramArrays';
import { TasksService } from 'src/app/core/services/board-service/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  toDashboardPage: boolean = true;
  toBoardPage: boolean = false;

  private routeSub!: Subscription;
  public id: string = '';

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

  boards: Board[] = [];

  private colorNumber: number = 0;
  public currentColumn: string = '';
  public todoCurrentColor: string = 'red-violet-crayola';
  public inProgressCurrentColor: string = 'pastel-pink';
  public doneCurrentColor: string = 'magic-mint';
  public archivedCurrentColor: string = 'wild-orchid';

  oldTaskName: string = '';
  taskToComment: string = '';
  searchedTaskName: string = '';
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };

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

  deleteCurrentTask: boolean = false;

  showArchivedTasks: boolean = false;
  tasksKey: string = 'tasks';
  boardsKey: string = 'boards';
  numberOfTasks: number = 0;

  constructor(
    private TasksService: TasksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
    });
  }

  ngOnInit(): void {
    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
    } else this.tasks = [];
    this.numberOfTasks = this.tasks.length;
    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');

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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
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
    let newTask: Task = this.addTaskForm?.value;
    newTask.created_at = new Date();
    newTask.id = newTask.name;
    newTask.status = column;
    this.TasksService.addNewTask(this.tasksKey, newTask);
    console.log(newTask);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    if (allTasks) {
      this.tasks = JSON.parse(allTasks);
    } else this.tasks = [];
    this.numberOfTasks = this.tasks.length;
    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');

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
    let newTaskName = this.editTaskForm?.value.name;
    this.TasksService.editTaskName(this.tasksKey, this.oldTaskName, newTaskName);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    this.tasks = JSON.parse(allTasks);
    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');

    this.editTaskForm?.reset();
    this.editCurrentTaskToDo = false;
    this.editCurrentTaskInProgress = false;
    this.editCurrentTaskDone = false;
    this.editCurrentTaskArchived = false;
  }

  editTask(task: any, column: string): void {
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
    this.oldTaskName = task.name;
  }

  deleteTask(task: { name: any; }): void {
    this.TasksService.deleteTask(this.tasksKey, task);
    let allTasks: any = localStorage.getItem(this.tasksKey);
    this.tasks = JSON.parse(allTasks);
    this.numberOfTasks = this.tasks.length;
    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');
  }

  archiveTask(task: any): void {
    this.TasksService.archiveTask(this.tasksKey, task);

    let allTasks: any = localStorage.getItem(this.tasksKey);
    this.tasks = JSON.parse(allTasks);
    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');

    this.showArchivedTasks = true;
  }

  hideArchivedTasks(): void {
    this.showArchivedTasks = false;
  }

  changeSortingParams(selectedParams: selectParams) {
    this.searchedTaskName = selectedParams.name;

    this.sort = selectedParams.sort;
    switch (this.sort) {
      case sortParams[0]:
        this.tasks.sort((a: any, b: any) => {
          let nameA = a.name.toLowerCase();
          let nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        break;
      case sortParams[1]:
        this.tasks.sort((a: any, b: any) => +a.date - +b.date);
        break;
      case sortParams[2]:
        this.tasks.sort((a: any, b: any) => a.numberOfTasks - b.numberOfTasks);
        break;
    }

    this.order = selectedParams.order;
    if (this.order === orderParams[1] && this.currentOrder === 'ASC') {
      this.tasks.reverse();
      this.currentOrder = 'DESC';
    } else if (this.order === orderParams[0] && this.currentOrder === 'DESC') {
      this.tasks.reverse();
      this.currentOrder = 'ASC';
    } else if (this.order === orderParams[1] && this.currentOrder === 'DESC') {
      this.currentOrder = 'DESC';
    }
    else if (this.order === orderParams[0] && this.currentOrder === 'ASC') {
      this.currentOrder = 'ASC';
    }

    this.todoTasks = this.tasks.filter((item: any) => item.status === 'todo');
    this.inProgressTasks = this.tasks.filter((item: any) => item.status === 'inProgress');
    this.doneTasks = this.tasks.filter((item: any) => item.status === 'done');
    this.archivedTasks = this.tasks.filter((item: any) => item.status === 'archived');
  }
}
