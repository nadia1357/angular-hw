import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { selectParams } from 'src/app/models/paramArrays';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Task[] = [];

  private _TASKS_URL = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(selectedParams: selectParams, boardId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this._TASKS_URL, {
      params: new HttpParams()
        .set('boardId', boardId)
        .set('name', selectedParams.name)
        .set('sort', selectedParams.sort)
        .set('order', selectedParams.order)
    });
  }

  getTaskById(selectedParams: selectParams, taskId: string): Observable<Task> {
    const getTaskURL = this._TASKS_URL + '/' + taskId;
    return this.http.get<Task>(getTaskURL, {
      params: new HttpParams()
        .set('name', selectedParams.name)
        .set('sort', selectedParams.sort)
        .set('order', selectedParams.order)
    });
  }

  addNewTask(task: Partial<Task>): Observable<unknown> {
    return this.http.post(this._TASKS_URL, task);
  }

  editTask(taskId: string, newTask: Partial<Task>): Observable<unknown> {
    const editURL: string = this._TASKS_URL + '/' + taskId;
    return this.http.put(editURL, newTask);
  }

  deleteTask(oldTaskId: string): Observable<unknown> {
    const deleteURL: string = this._TASKS_URL + '/' + oldTaskId;
    return this.http.delete(deleteURL);
  }

  archiveTask(oldTaskId: string): Observable<unknown> {
    const editURL: string = this._TASKS_URL + '/' + oldTaskId;
    const newTask: Partial<Task> = { status: 'archived' };
    return this.http.put(editURL, newTask);
  }
}
