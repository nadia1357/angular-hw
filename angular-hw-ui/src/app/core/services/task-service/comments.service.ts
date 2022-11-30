import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  tasks: Task[] = [];
  comments: string[] = [];

  constructor(private http: HttpClient) { }

  getComments(tasksKey: string) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    return of(this.tasks);
  }

  getCommentByName(tasksKey: string, taskName: string) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    } else this.tasks = [];
    let task: any = this.tasks.find((item: any) => item.name === taskName);
    this.tasks = [];
    this.tasks.push(task);
  }

  addNewComment(tasksKey: string, comment: string, taskId: any) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
      this.tasks.forEach(item => {
        if (item.id === taskId) {
          if (!item.comments) {
            item.comments = [];
          }
          item.comments.push(comment);
        }
      });
    } else this.tasks = [];

    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }

  editComment(tasksKey: string, oldComment: string, newComment: string, taskId: any) {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
      this.tasks.forEach(item => {
        if (item.id === taskId) {
          if (item.comments) {
            item.comments.forEach((el, index) => {
              if (el === oldComment) {
                item.comments[index] = newComment;
              }
            });
          } else {
            item.comments = [];
          }
        }
      });
    } else {
      this.tasks = [];
    }
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }

  deleteComment(tasksKey: string, comment: string, taskId: any): any {
    let tasksFromLocalStorage = localStorage.getItem(tasksKey);
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
      this.tasks.forEach(item => {
        if (item.id === taskId) {
          if (item.comments) {
            let deleteIndex = item.comments.findIndex((el: any) => el === comment);
            item.comments.splice(deleteIndex, 1);
          }
        }
      });
    } else {
      this.tasks = [];
    }
    localStorage.setItem(tasksKey, JSON.stringify(this.tasks));
  }
}
