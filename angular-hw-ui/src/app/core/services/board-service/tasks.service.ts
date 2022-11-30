import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { Board} from 'src/app/models/board';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Task[] = [];
  boards: Board[] = [];

  constructor(private http: HttpClient) { }

  getTasks(tasksKey: string) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    return of(this.tasks);
  }

  getTaskByName(tasksKey: string, taskName: string) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    let task: any = this.tasks.find((item: any) => item.name === taskName);
    this.tasks = [];
    this.tasks.push(task);
  }

  addNewTask(tasksKey: string, task: any) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    this.tasks.push(task);
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }

  editTaskName(tasksKey: string, oldTaskName: string, newTaskName: string) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    this.tasks.forEach((task, index) => {
      if (task.name === oldTaskName) {
        this.tasks[index].name = newTaskName;
      }
    });
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }

  deleteTask(tasksKey: string, task: { name: any; }): any {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    let deleteIndex = this.tasks.findIndex((item: any) => item.name == task.name);
    this.tasks.splice(deleteIndex, 1);
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }

  archiveTask(tasksKey: string, taskToArchive: {name: any}): any {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    this.tasks.forEach((task, index) => {
      if (task.name === taskToArchive.name) {
        this.tasks[index].status = 'archived';
      }
    });
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }
}