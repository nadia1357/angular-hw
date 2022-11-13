import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashCan, faComment, faPenToSquare, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';
import { sortParams, orderParams, selectParams, colors } from 'src/app/models/paramArrays';
import { TasksService } from 'src/app/core/services/board-service/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  faTrashCan = faTrashCan;
  faComment = faComment;
  faPenToSquare = faPenToSquare;
  faBoxArchive = faBoxArchive;

  public title = 'task';
  tasks: Task[] = [];
  colors = colors;
  searchedTaskName: string = '';
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };
  
  name: string = '';
  sort: string = 'Date';
  order: string = 'ASC';
  currentOrder: string = 'ASC';

  createNewTask: boolean = false;
  addTaskForm?: FormGroup;

  editCurrentTask: boolean = false;
  editTaskForm?: FormGroup;

  deleteCurrentTask: boolean = false;
  deleteTaskForm?: FormGroup;

  constructor(
    private TasksService: TasksService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
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

  onSubmit(): void {
    let newTask: Task = this.addTaskForm?.value;
    newTask.created_at = new Date();
    this.tasks.push(newTask);
    this.addTaskForm?.reset();
    this.createNewTask = false;
  }

  addNewTask(): void {
    this.createNewTask = true;
  }

  onEdit(task: { name: any; }): void {
    task.name = this.editTaskForm?.value.name;
    this.editTaskForm?.reset();
    this.editCurrentTask = false;
  }

  editBoard(): void {
    this.editCurrentTask = true;
  }

  deleteTask(board: { name: any; }, tasks: any): any {
    let deleteIndex = tasks.findIndex((item: any) => item.name == tasks.name);
    tasks.splice(deleteIndex, 1);
    return tasks;
  }

  changeSortingParams(selectedParams: selectParams) {
    

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
  }
}
