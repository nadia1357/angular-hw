import { TestBed } from '@angular/core/testing';

import { StateService, Count } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService]
    });
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBoardsCount', () => {
    it('should get the current boards count (called once)', (done: DoneFn) => {
      service.getBoardsCount().subscribe({
        next: boardsCount => {
          expect(boardsCount).toBeDefined();
          done();
        },
        error: done.fail
      });
    })
  })

  describe('#setBoardsCount', () => {
    it('Should emit next boards count', (done) => {
      const count: number = 1 ;
      service.setBoardsCount(count);
      service.boardsCounter.subscribe(c => {
        expect(c).toEqual({value: count})
        done();
      });
    });
  })
});
