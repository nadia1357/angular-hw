import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sortParams, orderParams, selectParams, sorts, orders } from 'src/app/models/paramArrays';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent implements OnInit {
  sortParams = sortParams;
  orderParams = orderParams;
  selectedParams: selectParams = { name: '', sort: 'Date', order: 'ASC' };

  items = ['Anna', 'Beata', 'Cindy', 'Dolly', 'Eugenie', 'Ginger'];
  itemName: string = '';

  @Input() title: string = '';
  @Output() newEvent = new EventEmitter<selectParams>();

  addNewSort(value: sorts) {
    this.selectedParams.sort = value;
    this.newEvent.emit(this.selectedParams);
  }

  addNewOrder(value: orders) {
    this.selectedParams.order = value;
    this.newEvent.emit(this.selectedParams);
  }

  ngOnInit(): void { }
}
