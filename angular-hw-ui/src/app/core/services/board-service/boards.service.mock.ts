import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Board } from 'src/app/models/board';
import { SelectParams } from 'src/app/models/paramArrays';
import { boardsMock } from 'src/app/mocks/boards-mock';

const userId = boardsMock[0].userId; // we choose userId for testing
const _id = boardsMock[0]._id; // we choose boardId for testing
const boardsOfChoosenUserId: Board[] = boardsMock.filter(item => item.userId === userId);
const boardOfChoosenBoardId: any = boardsMock.find(item => item._id === _id);

@Injectable()
export class BoardsServiceMock {
    constructor() { }

    getBoards(selectedParams: SelectParams): Observable<Board[]> {
        return of(boardsOfChoosenUserId);
    }

    getBoardByName(boardId: string) {
        return of(boardOfChoosenBoardId);
    }

    addNewBoard(board: Board): Observable<unknown> {
        return of(true);
    }

    editBoardName(oldBoardId: string, newBoardName: string): Observable<unknown> {
        return of(true);
    }

    deleteBoard(oldBoardId: string): Observable<unknown> {
        return of(true);
    }

    updateNumberOfTasks(oldBoardId: string, newNumberOfTasks: number): Observable<unknown> {
        return of(true);
    }
}
