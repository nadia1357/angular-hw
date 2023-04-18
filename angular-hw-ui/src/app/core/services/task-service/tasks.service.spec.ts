import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { TasksService } from './tasks.service';
import { tasksMock, newTaskMock } from 'src/app/mocks/tasks-mock';
import { searchMock } from 'src/app/mocks/search-mock';
import { Task } from 'src/app/models/task';

const boardId = tasksMock[0].boardId; // we choose boardId for testing
const _id = tasksMock[0]._id; // we choose taskId for testing
const tasksOfChoosenBoardId: Task[] = tasksMock.filter(item => item.boardId === boardId);
const taskOfChoosenTaskId: any = tasksMock.find(item => item._id === _id);

describe('TasksService', () => {
  let service: TasksService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new TasksService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTasks', () => {
    it('should return all tasks with choosen BoardId', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of({ tasks: tasksOfChoosenBoardId }));

      service.getTasks(searchMock, boardId).subscribe({
        next: tasks => {
          expect(tasks).toEqual(tasksOfChoosenBoardId);
          done()
        },
        error: done.fail
      });
    });
  });

  describe('#getTaskById', () => {
    it('should return the task with choosen TaskId', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(taskOfChoosenTaskId));

      service.getTaskById(searchMock, _id).subscribe({
        next: task => {
          expect(task).toEqual(taskOfChoosenTaskId);
          done();
        },
        error: done.fail
      });
    });
  });

  describe('#addNewTask', () => {
    it('should add the new task (called once)', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of(newTaskMock));

      service.addNewTask(newTaskMock).subscribe({
        next: task => {
          expect(task).toBeTruthy();
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  })

  describe('#editTask', () => {
    it('should edit the task name', (done: DoneFn) => {
      const task: Partial<Task> = { name: 'new name' };
      httpClientSpy.put.and.returnValue(of({}));

      service.editTask(_id, task).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });

    it('should edit a task by changing its status', (done: DoneFn) => {
      const task: Partial<Task> = { status: 'done' };
      httpClientSpy.put.and.returnValue(of({}));

      service.editTask(_id, task).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });

    it('should edit a task by adding a new comment', (done: DoneFn) => {
      const task: Partial<Task> = { comments: ['new comment', 'new comment'] };
      httpClientSpy.put.and.returnValue(of({}));

      service.editTask(_id, task).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });

    it('should edit a task by editing a comment', (done: DoneFn) => {
      const task: Partial<Task> = { comments: ['comment to change', 'comment 1', 'changed comment'] };
      httpClientSpy.put.and.returnValue(of({}));

      service.editTask(_id, task).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });

    it('should edit a task by deleting a comment', (done: DoneFn) => {
      const task: Partial<Task> = { comments: ['comment to delete', 'comment 2'] };
      httpClientSpy.put.and.returnValue(of({}));

      service.editTask(_id, task).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })

  describe('#deleteTask', () => {
    it('should delete the task', (done: DoneFn) => {
      httpClientSpy.delete.and.returnValue(of({}));

      service.deleteTask(tasksMock[1]._id).subscribe({
        next: () => {
          expect(httpClientSpy.delete).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })

  describe('#archiveTask', () => {
    it('should archive the task', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({}));

      service.archiveTask(tasksMock[2]._id).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })
})
