import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: string): string {
    const result: string = ':( ' + value + ' ):';
    return result;
  }
}
