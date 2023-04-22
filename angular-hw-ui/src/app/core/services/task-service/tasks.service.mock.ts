import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { Task } from 'src/app/models/task';
import { SelectParams } from 'src/app/models/paramArrays';
import { tasksMock } from 'src/app/mocks/tasks-mock';

const boardId = tasksMock[0].boardId; // we choose boardId for testing
const _id = tasksMock[0]._id; // we choose taskId for testing
const tasksOfChoosenBoardId: Task[] = tasksMock.filter(item => item.boardId === boardId);
const taskOfChoosenTaskId: any = tasksMock.find(item => item._id === _id);

@Injectable()
export class TasksServiceMock {
    constructor() { }

    getTasks(selectedParams: SelectParams, boardId: string): Observable<Task[]> {
        return of(tasksOfChoosenBoardId);
    }

    getTaskById(selectedParams: SelectParams, taskId: string): Observable<{ task: Task }> {
        return of(taskOfChoosenTaskId);
    }

    addNewTask(task: Partial<Task>): Observable<unknown> {
        return of(true);
    }

    editTask(taskId: string, newTask: Partial<Task>): Observable<unknown> {
        return of(true);
    }

    deleteTask(oldTaskId: string): Observable<unknown> {
        return of(true);
    }

    archiveTask(oldTaskId: string): Observable<unknown> {
        return of(true);
    }
}
