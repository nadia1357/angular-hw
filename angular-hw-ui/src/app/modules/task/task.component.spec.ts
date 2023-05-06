import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

import { Task } from 'src/app/models/task';
import { TaskComponent } from './task.component';
import { SelectParams, colors } from 'src/app/models/paramArrays';
import { TasksService } from 'src/app/core/services/task-service/tasks.service';
import { tasksMock } from 'src/app/mocks/tasks-mock';
import { HeaderStubComponent, FooterStubComponent, SortingStubComponent } from 'src/app/stubs/stubs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let tasksService: TasksService;
  let route: ActivatedRoute;

  const taskId = tasksMock[0]._id; // we choose taskId for testing
  const selectedParamsMock: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        TaskComponent, HeaderStubComponent,
        FooterStubComponent, SortingStubComponent
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: taskId }) } }, 
        TasksService, FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    tasksService = TestBed.inject(TasksService);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addCommentForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require valid name', () => {
      if (component.addCommentForm) {
        component.addCommentForm.setValue({
          'name': '',
        });
        expect(component.addCommentForm.valid).toEqual(false);
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.addCommentForm) {
        component.addCommentForm.setValue({
          'name': 'Comment 1',
        });
        expect(component.addCommentForm.valid).toEqual(true);
      }
    });
  });

  describe('#editCommentForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require valid name', () => {
      if (component.editCommentForm) {
        component.editCommentForm.setValue({
          'name': ''
        });
        expect(component.editCommentForm.valid).toEqual(false);
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.editCommentForm) {
        component.editCommentForm.setValue({
          'name': 'Comment new',
        });
        expect(component.editCommentForm.valid).toEqual(true);
      }
    });
  });

  describe('#OnInit', () => {
    it('should subscribe on init', () => {
      component.ngOnInit();
      const spy = spyOn(component, 'refreshComments');
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

  describe('#changeColor', () => {
    it('should change the column color', () => {
      component.changeColor(1)
      expect(component.colorNumber).toBe(1);
    });
  });

  describe('#getColorValue', () => {
    it('should get color value', () => {
      component.colorNumber = 1; // choose color number for test
      component.getColorValue();
      expect(component.currentCommentColor).toBe(colors[component.colorNumber]);
    });
  });

  describe('#onSubmit', () => {
    it('should add a new comment', () => {
      const spyRefresh = spyOn(component, 'refreshComments');
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(of({}));
      component.onSubmit();

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
      expect(component.addCommentForm?.reset()).toBeFalsy();
      expect(component.createNewComment).toBeFalse();
    });

    it('should not add a newcomment if error', () => {
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(throwError(() => new Error('404')));
      component.onSubmit();
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#addNewComment', () => {
    it('`createNewComment` should be true', () => {
      component.addNewComment();
      expect(component.createNewComment).toBeTrue();
    });
  });

  describe('#onEdit', () => {
    it('should edit the comment', () => {
      const spyRefresh = spyOn(component, 'refreshComments');
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(of({}));
      component.onEdit();

      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
      expect(component.editCommentForm?.reset()).toBeFalsy();
      expect(component.editCurrentComment).toBeFalse();
    });

    it('should not edit the task  if error', () => {
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(throwError(() => new Error('404')));
      component.onEdit();
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#editComment', () => {
    it('`editCurrentComment` should be true', () => {
      component.editComment('edit comment');
      expect(component.editCurrentComment).toBeTrue();
      expect(component.oldComment).toBe('edit comment');
    });
  });

  describe('#deleteComment', () => {
    it('should delete the comment', () => {
      const spyRefresh = spyOn(component, 'refreshComments');
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(of({}));
      component.deleteComment('delete this comment');
      expect(spyTasksService).toBeTruthy();
      expect(spyRefresh).toBeTruthy();
    });

    it('should not delete the comment if error', () => {
      const spyTasksService = spyOn(tasksService, 'editTask').and.returnValue(throwError(() => new Error('404')));
      component.deleteComment('delete this comment');
      expect(spyTasksService).toBeTruthy();
    });
  });

  describe('#changeSortingParams', () => {
    it('selectedParams should get a new value', () => {
      component.changeSortingParams(selectedParamsMock);
      expect(component.selectedParams).toEqual(selectedParamsMock);
      const spy = spyOn(component, 'refreshComments');
      expect(spy).toBeTruthy();
    });
  });

  describe('#refreshComments', () => {
    it('should refresh all comments of this boardId and of this taskId on the page', () => {
      const spyGetTasks = spyOn(tasksService, 'getTaskById').and.returnValue(of({task: tasksMock[0]}));
      component.refreshComments();
      expect(spyGetTasks).toBeTruthy();
      expect(component.comments).toEqual(tasksMock[0].comments);
      expect(component.boardId).toBe(tasksMock[0].boardId);
    });
  });

});
