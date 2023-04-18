import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { BoardsService } from './boards.service';
import { boardsMock, newBoardMock } from 'src/app/mocks/boards-mock';
import { searchMock } from 'src/app/mocks/search-mock';
import { Board } from 'src/app/models/board';

const userId = boardsMock[0].userId; // we choose userId for testing
const _id = boardsMock[0]._id; // we choose boardId for testing
const boardsOfChoosenUserId: Board[] = boardsMock.filter(item => item.userId === userId);
const boardOfChoosenBoardId: any = boardsMock.find(item => item._id === _id);

describe('BoardsService', () => {
  let service: BoardsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    service = new BoardsService(httpClientSpy, routerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBoards', () => {
    it('should return all boards with choosen UserId (called once)', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of({ boards: boardsOfChoosenUserId }));

      service.getBoards(searchMock).subscribe({
        next: boards => {
          expect(boards).toEqual(boardsOfChoosenUserId);
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  })

  describe('#getBoardByName', () => {
    it('should return the board with choosen BoardId (called once)', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(boardOfChoosenBoardId));

      service.getBoardByName(_id).subscribe({
        next: board => {
          expect(board).toEqual(boardOfChoosenBoardId);
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  })

  describe('#addNewBoard', () => {
    it('should add the new board (called once)', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(of(newBoardMock));

      service.addNewBoard(newBoardMock).subscribe({
        next: board => {
          expect(board).toBeTruthy();
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  })

  describe('#editBoardName', () => {
    it('should edit the board name', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({}));

      service.editBoardName(boardsMock[2]._id, 'new name').subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })

  describe('#deleteBoard', () => {
    it('should delete the board', (done: DoneFn) => {
      httpClientSpy.delete.and.returnValue(of({}));

      service.deleteBoard(boardsMock[1]._id).subscribe({
        next: () => {
          expect(httpClientSpy.delete).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })

  describe('#updateNumberOfTasks', () => {
    it('should update number of tasks in this board', (done: DoneFn) => {
      httpClientSpy.put.and.returnValue(of({}));

      service.updateNumberOfTasks(boardsMock[2]._id, 1).subscribe({
        next: () => {
          expect(httpClientSpy.put).toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    });
  })
})
