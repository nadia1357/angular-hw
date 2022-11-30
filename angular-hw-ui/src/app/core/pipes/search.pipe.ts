import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any [], itemNameInput: string): any[] {
    if (!itemNameInput) {
      return items;
    }
    itemNameInput = itemNameInput.toLowerCase();
    return items.filter(
      x => x.name.toLowerCase().includes(itemNameInput)
    )
  }
}
