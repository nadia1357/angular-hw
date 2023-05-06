import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { of, throwError } from 'rxjs';

import { BoardComponent } from './board.component';
import { Task } from 'src/app/models/task';
import { SelectParams, colors } from 'src/app/models/paramArrays';
import { BoardsService } from 'src/app/core/services/board-service/boards.service';
import { TasksService } from 'src/app/core/services/task-service/tasks.service';
import { tasksMock } from 'src/app/mocks/tasks-mock';
import { HeaderStubComponent, FooterStubComponent, SortingStubComponent } from 'src/app/stubs/stubs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let boardsService: BoardsService;
  let tasksService: TasksService;
  let route: ActivatedRoute;

  const boardId = tasksMock[0].boardId; // we choose boardId for testing
  const tasksOfChoosenBoardId: Task[] = tasksMock.filter(item => item.boardId === boardId);
  const todoTasks = tasksOfChoosenBoardId.filter(item => item.status === 'todo');
  const inProgressTasks = tasksOfChoosenBoardId.filter(item => item.status === 'inProgress');
  const doneTasks = tasksOfChoosenBoardId.filter(item => item.status === 'done');
  const archivedTasks = tasksOfChoosenBoardId.filter(item => item.status === 'archived');
  const selectedParamsMock: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        BoardComponent, HeaderStubComponent,
        FooterStubComponent, SortingStubComponent
      ],
      imports: [
        ReactiveFormsModule, FormsModule,
        DragDropModule, HttpClientModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: boardId }) } },
        BoardsService, TasksService, FormBuilder
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    boardsService = TestBed.inject(BoardsService);
    tasksService = TestBed.inject(TasksService);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addTaskForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require valid name', () => {
      if (component.addTaskForm) {
        component.addTaskForm.setValue({
          'name': '',
        });
        expect(component.addTaskForm.valid).toEqual(false);
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.addTaskForm) {
        component.addTaskForm.setValue({
          'name': 'Task 1',
        });
        expect(component.addTaskForm.valid).toEqual(true);
      }
    });
  });

  describe('#editTaskForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require valid name', () => {
      if (component.editTaskForm) {
        component.editTaskForm.setValue({
          'name': ''
        });
        expect(component.editTaskForm.valid).toEqual(false);
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.editTaskForm) {
        component.editTaskForm.setValue({
          'name': 'Task 1',
        });
        expect(component.editTaskForm.valid).toEqual(true);
      }
    });
  });

  describe('#OnInit', () => {
    it('should subscribe on init', () => {
      component.ngOnInit();
      const spy = spyOn(component, 'refreshTasks');
      expect(spy).toBeTruthy();
    });
  });

  describe('#logOut and NumberOfBoards', () => {
    it('logOut and NumberOfBoards should be true', () => {
      component.ngOnInit();
      expect(component.numberOfBoards).toBe(true);
      expect(component.logOut).toBe(true);
    });
  });

  describe('#OnDestroy', () => {
    it('should unsubscribe on destroy', () => {
      component['routeSub'] = of(true).subscribe();
      component.ngOnDestroy();
      expect(component['routeSub'].closed).toBeTruthy();
      expect(component['destroy$'].complete).toBeTruthy();
    });
  });

  describe('#drop', () => {
    it('should make drag-drop into the same drop list', () => {
      let container = {
        data: [tasksMock[0], tasksMock[1], tasksMock[2]],
        id: 'todo'
      };

      let myEventMock1 = {
        container: container,
        previousContainer: container,
        currentIndex: 0,
        previousIndex: 2
      } as unknown as CdkDragDrop<string[]>;
      
      component.drop(myEventMock1);
      expect(component.drop).toBeTruthy();
    });

    it('should make drag-drop to another drop list and change the dropped element status', () => {
      let myEventMock2 = {
        container: {
          data: [tasksMock[0], tasksMock[1], tasksMock[2]],
          id: 'todo'
        },
        previousContainer: {
          data: [tasksMock[3], tasksMock[4], tasksMock[5]],
          id: 'inProgress'
        },
        currentIndex: 1,
        previousIndex: 2
      } as unknown as CdkDragDrop<string[]>;

      let spy = spyOn(component, 'changeTaskStatus');
      component.drop(myEventMock2);
      expect(component.drop).toBeTruthy();
      expect(spy).toBeTruthy();
    });
  });

  describe('#changeColumnColor', () => {
    it('should change the column color', () => {
      component.changeColumnColor(1, 'inProgress')
      expect(component.colorNumber).toBe(1);
      expect(component.currentColumn).toBe('inProgress');
    });
  });

  describe('#getColorValue', () => {
    it('should get color value for `todo` column', () => {
      component.colorNumber = 1; // choose color number for test
      component.currentColumn = 'todo';
      component.getColorValue('todo');
      expect(component.todoCurrentColor).toBe(colors[component.colorNumber]);
    });

    it('should get color value for `inProgress` column', () => {
      component.colorNumber = 1; // choose color number for test
      component.currentColumn = 'inProgress';
      component.getColorValue('inProgress');
      expect(component.inProgressCurrentColor).toBe(colors[component.colorNumber]);
    });

    it('should get color value for `done` column', () => {
      component.colorNumber = 1; // choose color number for test
      component.currentColumn = 'done';
      component.getColorValue('done');
      expect(component.doneCurrentColor).toBe(colors[component.colorNumber]);
    });

    it('should get color value for `archived` column', () => {
      component.colorNumber = 1; // choose color number for test
      component.currentColumn = 'archived';
      component.getColorValue('archived');
      expect(component.archivedCurrentColor).toBe(colors[component.colorNumber]);
    });
  });

  describe('#onSubmit', () => {
    it('should add a new task', () => {
      const spyRefresh = spyOn(component, 'refreshTasks');
      const spyTasksService = spyOn(tasksService, 'addNewTask').and.returnValue(of({}));
      const spyBoardService = spyOn(boardsService, 'updateNumberOfTasks').and.returnValue(of({}));
      component.onSubmit('todo');

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
      expect(spyBoardService).toBeTruthy();

      expect(component.addTaskForm?.reset()).toBeFalsy();
      expect(component.createNewTaskToDo).toBeFalse();
      expect(component.createNewTaskInProgress).toBeFalse();
      expect(component.createNewTaskDone).toBeFalse();
      expect(component.createNewTaskArchived).toBeFalse();
    });

    it('should not add a new task if error', () => {
      const spyTasksService = spyOn(tasksService, 'addNewTask').and.returnValue(throwError(() => new Error('404')));
      component.onSubmit('todo');
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#addNewTask', () => {
    it('`createNewTaskToDo` should be true', () => {
      component.addNewTask('todo');
      expect(component.createNewTaskToDo).toBeTrue();
    });

    it('`createNewTaskInProgress` should be true', () => {
      component.addNewTask('inProgress');
      expect(component.createNewTaskInProgress).toBeTrue();
    });

    it('`createNewTaskDone` should be true', () => {
      component.addNewTask('done');
      expect(component.createNewTaskDone).toBeTrue();
    });

    it('`createNewTaskArchived` should be true', () => {
      component.addNewTask('archived');
      expect(component.createNewTaskArchived).toBeTrue();
    });
  });

  describe('#onEdit', () => {
    it('should edit the task', () => {
      const spyRefresh = spyOn(component, 'refreshTasks');
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(of({}));
      component.onEdit();

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();

      expect(component.editTaskForm?.reset()).toBeFalsy();
      expect(component.editCurrentTaskToDo).toBeFalse();
      expect(component.editCurrentTaskInProgress).toBeFalse();
      expect(component.editCurrentTaskDone).toBeFalse();
      expect(component.editCurrentTaskArchived).toBeFalse();
    });

    it('should not edit the task  if error', () => {
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(throwError(() => new Error('404')));
      component.onEdit();
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#editTask', () => {
    it('`editCurrentTaskToDo` should be true', () => {
      component.editTask(tasksMock[1], 'todo');
      expect(component.editCurrentTaskToDo).toBeTrue();
      expect(component.taskId).toBe(tasksMock[1]._id);
    });

    it('`editCurrentTaskInProgress` should be true', () => {
      component.editTask(tasksMock[1], 'inProgress');
      expect(component.editCurrentTaskInProgress).toBeTrue();
      expect(component.taskId).toBe(tasksMock[1]._id);
    });

    it('`editCurrentTaskDone` should be true', () => {
      component.editTask(tasksMock[1], 'done');
      expect(component.editCurrentTaskDone).toBeTrue();
      expect(component.taskId).toBe(tasksMock[1]._id);
    });

    it('`editCurrentTaskArchived` should be true', () => {
      component.editTask(tasksMock[1], 'archived');
      expect(component.editCurrentTaskArchived).toBeTrue();
      expect(component.taskId).toBe(tasksMock[1]._id);
    });
  });

  describe('#deleteTask', () => {
    it('should delete the task', () => {
      const spyRefresh = spyOn(component, 'refreshTasks');
      const spyTasksService = spyOn(tasksService, 'deleteTask').and.returnValue(of({}));
      const spyBoardService = spyOn(boardsService, 'updateNumberOfTasks').and.returnValue(of({}));
      component.deleteTask(tasksMock[2]);

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
      expect(spyBoardService).toBeTruthy;
    });

    it('should not delete the task if error', () => {
      const spyTasksService = spyOn(tasksService, 'deleteTask').and.returnValue(throwError(() => new Error('404')));
      component.deleteTask(tasksMock[0]);
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#archiveTask', () => {
    it('should archive the task', () => {
      const spyRefresh = spyOn(component, 'refreshTasks');
      const spyTasksService = spyOn(tasksService, 'archiveTask').and.returnValue(of({}));
      component.archiveTask(tasksMock[2]);

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
      expect(component.showArchivedTasks).toBeTrue();
    });

    it('should not archive the task if error', () => {
      const spyTasksService = spyOn(tasksService, 'archiveTask').and.returnValue(throwError(() => new Error('404')));
      component.archiveTask(tasksMock[2]);
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#changeTaskStatus', () => {
    it('should change the task status', () => {
      const spyRefresh = spyOn(component, 'refreshTasks');
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(of({}));
      component.changeTaskStatus(tasksMock[2], 'inProgress');
      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
    });

    it('should not change the task status if error', () => {
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(throwError(() => new Error('404')));
      component.changeTaskStatus(tasksMock[2], 'done');
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#hideArchivedTasks', () => {
    it('`showArchivedTasks` should be false', () => {
      component.hideArchivedTasks();
      expect(component.showArchivedTasks).toBeFalse();
    });
  });

  describe('#changeSortingParams', () => {
    it('selectedParams should get a new value', () => {
      component.changeSortingParams(selectedParamsMock);
      expect(component.selectedParams).toEqual(selectedParamsMock);
      const spy = spyOn(component, 'refreshTasks');
      expect(spy).toBeTruthy();
    });
  });

  describe('#refreshTasks', () => {
    it('should refresh all tasks of this boardId on the page', () => {
      const spyGetTasks = spyOn(tasksService, 'getTasks').and.returnValue(of(tasksOfChoosenBoardId));
      component.refreshTasks();
      expect(spyGetTasks).toBeTruthy();
      expect(component.tasks).toEqual(tasksOfChoosenBoardId);
      expect(component.todoTasks).toEqual(todoTasks);
      expect(component.inProgressTasks).toEqual(inProgressTasks);
      expect(component.doneTasks).toEqual(doneTasks);
      expect(component.archivedTasks).toEqual(archivedTasks);
    });
  });
});
