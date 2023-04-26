import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingComponent } from './sorting.component';
import { SelectParams } from 'src/app/models/paramArrays';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  let selectedParamsMock: SelectParams = { name: '', sort: 'Date', order: 'ASC' };
  let paramTypeMock: string [] = ['name', 'sort', 'order'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on `Search name` typed', () => {
    spyOn(component.newSortingEvent, 'emit');
    component.addNewParam(selectedParamsMock.name, paramTypeMock[0]);
    expect(component.newSortingEvent.emit).toHaveBeenCalled();
    expect(component.newSortingEvent.emit).toHaveBeenCalledWith(selectedParamsMock);
  });

  it('should emit on `sort` choosed', () => {
    spyOn(component.newSortingEvent, 'emit');
    component.addNewParam(selectedParamsMock.sort, paramTypeMock[1]);
    expect(component.newSortingEvent.emit).toHaveBeenCalled();
    expect(component.newSortingEvent.emit).toHaveBeenCalledWith(selectedParamsMock);
  });

  it('should emit on `order` choosed', () => {
    spyOn(component.newSortingEvent, 'emit');
    component.addNewParam(selectedParamsMock.order, paramTypeMock[2]);
    expect(component.newSortingEvent.emit).toHaveBeenCalled();
    expect(component.newSortingEvent.emit).toHaveBeenCalledWith(selectedParamsMock);
  });
});
