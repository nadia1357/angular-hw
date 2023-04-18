import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<button [appHighlight]>Test button</button>`
})
class TestComponent { }

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testedEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        HighlightDirective
      ]
    })
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    testedEl = fixture.debugElement.query(By.directive(HighlightDirective));
  });

  it('detect hover changes', () => {
    testedEl.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    expect(testedEl.nativeElement.style.backgroundColor).toBe('lightgray');
    testedEl.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    expect(testedEl.nativeElement.style.backgroundColor).toBe('');
  });

  it('should create an instance', () => {
    const directive = new HighlightDirective(testedEl);
    expect(directive).toBeTruthy();
  });
})

