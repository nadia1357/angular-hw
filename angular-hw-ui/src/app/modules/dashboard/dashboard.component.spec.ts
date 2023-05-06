import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { SelectParams } from 'src/app/models/paramArrays';
import { Board } from 'src/app/models/board';
import { boardsMock } from 'src/app/mocks/boards-mock';
import { BoardsService } from 'src/app/core/services/board-service/boards.service';
import { StateService, Count } from 'src/app/core/services/state-service/state.service';
import {
  FormatPipeStub, HighlightDirectiveStub,
  HeaderStubComponent, FooterStubComponent,
  SortingStubComponent
} from 'src/app/stubs/stubs';

let boardsCount: Count = { value: 1 };
const userId = boardsMock[0].userId; // we choose userId for testing
const _id = boardsMock[0]._id; // we choose boardId for testing
const boardsOfChoosenUserId: Board[] = boardsMock.filter(item => item.userId === userId);
const boardOfChoosenBoardId: any = boardsMock.find(item => item._id === _id);
const selectedParamsMock: SelectParams = { name: '', sort: 'Date', order: 'ASC' };

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let boardsService: BoardsService;
  let stateService: StateService;

  beforeEach(async () => {
    const boardsServiceSpy = jasmine.createSpyObj<BoardsService>('BoardsService', {
      getBoards: of(boardsOfChoosenUserId),
      getBoardByName: of(boardOfChoosenBoardId),
      addNewBoard: of({}),
      editBoardName: of({}),
      deleteBoard: of({}),
      updateNumberOfTasks: of({})
    });

    const stateServiceSpy = jasmine.createSpyObj<StateService>('StateService', {
      getBoardsCount: of(boardsCount),
      setBoardsCount: undefined
    });

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent, HighlightDirectiveStub, FormatPipeStub,
        HeaderStubComponent, FooterStubComponent, SortingStubComponent
      ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: BoardsService, useValue: boardsServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        FormBuilder
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    boardsService = TestBed.inject(BoardsService);
    stateService = TestBed.inject(StateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addBoardForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('form is invalid when empty', () => {
      if (component.addBoardForm) {
        component.addBoardForm.setValue({
          'name': '',
          'description': ''
        });
        expect(component.addBoardForm.valid).toBeFalsy();
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.addBoardForm) {
        component.addBoardForm.setValue({
          'name': 'Board 1',
          'description': 'Info about Board 1'
        });
        expect(component.addBoardForm.valid).toBeTruthy();
      }
    });
  });

  describe('#editBoardForm', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should require valid name', () => {
      if (component.editBoardForm) {
        component.editBoardForm.setValue({
          'name': ''
        });
        expect(component.editBoardForm.valid).toBeFalsy();
      }
    });

    it('should be valid if form value is valid', () => {
      if (component.editBoardForm) {
        component.editBoardForm.setValue({
          'name': 'Board 1',
        });
        expect(component.editBoardForm.valid).toBeTruthy();
      }
    });
  });

  describe('#OnInit', () => {
    it('should subscribe on init', () => {
      component.ngOnInit();
      expect(component.subscriptionBoardsCounter).toBeTruthy();
      const spy = spyOn(component, 'refreshBoards');
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
      component['subscriptionBoardsCounter'] = of(true).subscribe();
      component.ngOnDestroy();
      expect(component['subscriptionBoardsCounter'].closed).toBeTruthy();
      expect(component['destroy$'].complete).toBeTruthy();
    });
  });

  describe('#onSubmit', () => {
    it('should add a new board', () => {
      component.onSubmit();
      expect(boardsService.addNewBoard(boardsMock[1])).toBeTruthy();
      const spy = spyOn(component, 'refreshBoards');
      expect(spy).toBeTruthy();
      expect(component.addBoardForm?.reset()).toBeFalsy();
      expect(component.createNewBoard).toBeFalse();
    });
  });

  describe('#addNewBoard', () => {
    it('`createNewBoard` should be true', () => {
      component.addNewBoard();
      expect(component.createNewBoard).toBeTrue();
    });
  });

  describe('#onEdit', () => {
    it('should edit the board', () => {
      component.onEdit();
      expect(boardsService.editBoardName(boardsMock[0]._id, 'newBoardName')).toBeTruthy();
      const spy = spyOn(component, 'refreshBoards');
      expect(spy).toBeTruthy();
      expect(component.editBoardForm?.reset()).toBeFalsy();
      expect(component.editCurrentBoard).toBeFalse();
    });
  });

  describe('#editBoard', () => {
    it('editCurrentBoard should be true, oldBoardId should be board._id', () => {
      component.editBoard(boardsMock[1]);
      expect(component.editCurrentBoard).toBeTrue();
      expect(component.oldBoardId).toBe(boardsMock[1]._id);
    });
  });

  describe('#deleteBoard', () => {
    it('should delete the board', () => {
      component.deleteBoard(boardsMock[0]);
      expect(boardsService.deleteBoard(boardsMock[0]._id)).toBeTruthy();
      const spy = spyOn(component, 'refreshBoards');
      expect(spy).toBeTruthy;
    });
  });

  describe('#throwBoardId', () => {
    it('should throw the board._id to currentBoardId', () => {
      component.throwBoardId(boardsMock[2]);
      expect(component.currentBoardId).toBe(boardsMock[2]._id);
    });
  });

  describe('#changeSortingParams', () => {
    it('selectedParams should get a new value', () => {
      component.changeSortingParams(selectedParamsMock);
      expect(component.selectedParams).toEqual(selectedParamsMock);
      const spy = spyOn(component, 'refreshBoards');
      expect(spy).toBeTruthy();
    });
  });

  describe('#refreshBoards', () => {
    it('should refresh all boards of this User on the page', fakeAsync(() => {
      component.refreshBoards();
      expect(component.boards).toEqual(boardsOfChoosenUserId);
      expect(stateService.setBoardsCount).toHaveBeenCalled();
    }));
  });
});

describe('DashboardComponent testing errors', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let boardsService: BoardsService;
  let stateService: StateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent, HighlightDirectiveStub, FormatPipeStub,
        HeaderStubComponent, FooterStubComponent, SortingStubComponent
      ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [BoardsService, StateService, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    boardsService = TestBed.inject(BoardsService);
    stateService = TestBed.inject(StateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#onSubmit', () => {
    it('should not add a new board if error', () => {
      const spyBoardsService = spyOn(boardsService, 'addNewBoard').and.returnValue(throwError(() => new Error('404')));
      component.onSubmit();
      expect(spyBoardsService).toBeTruthy();
    });
  });

  describe('#onEdit', () => {
    it('should not edit the board if error', () => {
      const spyBoardsService = spyOn(boardsService, 'editBoardName').and.returnValue(throwError(() => new Error('404')));
      component.onEdit();
      expect(spyBoardsService).toBeTruthy();
    });
  });

  describe('#deleteBoard', () => {
    it('should not delete the board if error', () => {
      const spyBoardsService = spyOn(boardsService, 'deleteBoard').and.returnValue(throwError(() => new Error('404')));
      component.deleteBoard(boardsMock[1]);
      expect(spyBoardsService).toBeTruthy();
    });
  });
});
