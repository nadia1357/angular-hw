import { Pipe, PipeTransform, Directive, Component, Input, Output, EventEmitter } from "@angular/core";

@Pipe({  name: 'format' })
export class FormatPipeStub implements PipeTransform {
  transform(value: string): string {
    const result = value;
    return result;
  }
}

@Directive({
  selector: '[highlight]',
  exportAs: 'highlight'
})
export class HighlightDirectiveStub { }

@Component({
  selector: 'app-footer',
  template: '<footer></footer>'
})
export class FooterStubComponent { }

@Component({
  selector: 'app-header',
  template: '<header></header>'
})
export class HeaderStubComponent {
  @Input() numberOfBoards = true;
  @Input() logOut = true;
}

@Component({
  selector: 'app-sorting',
  template: '<div></div>'
})

export class SortingStubComponent {
  @Output() newSortingEvent = new EventEmitter<any>();
}
