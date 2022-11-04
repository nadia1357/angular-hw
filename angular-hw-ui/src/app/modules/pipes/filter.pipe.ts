import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
      return value.filter((val: String) => val.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    } else {
      return value;
    }
   }

}
