import { Component, Output, EventEmitter } from '@angular/core';
import { sortParams, orderParams, SelectParams } from 'src/app/models/paramArrays';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {
  sortParams = sortParams;
  orderParams = orderParams;
  selectedParams: SelectParams = { name: '', sort: 'Date', order: 'ASC' };
  paramType: string = '';

  @Output() newSortingEvent = new EventEmitter<SelectParams>();

  addNewParam(value: string, paramType: string) {
    switch (paramType) {
      case ('name'): {
        this.selectedParams.name = value;
        this.newSortingEvent.emit(this.selectedParams);
        break;
      }
      case ('sort'): {
        this.selectedParams.sort = value;
        this.newSortingEvent.emit(this.selectedParams);
        break;
      }
      case ('order'): {
        this.selectedParams.order = value;
        this.newSortingEvent.emit(this.selectedParams);
        break;
      }
    }
  }
}
