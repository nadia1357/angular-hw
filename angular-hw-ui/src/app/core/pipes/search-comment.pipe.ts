import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchComment'
})
export class SearchCommentPipe implements PipeTransform {

  transform(items: any [], itemNameInput: string): any[] {
    if (!itemNameInput) {
      return items;
    }
    itemNameInput = itemNameInput.toLowerCase();
    return items.filter(
      x => x.toLowerCase().includes(itemNameInput)
    )
  }

}
