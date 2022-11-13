import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
