import { Directive, ElementRef, HostListener, output } from '@angular/core';
import { isContainElement } from '../utils/utils';

@Directive({
  selector: '[ngxClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  inside = output<EventTarget>();
  outside = output<EventTarget>();

  constructor(
    private el: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event'])
  onClick(event: PointerEvent) {
    const target = event.target;
    if (target) {
      if (isContainElement(this.el.nativeElement, target)) {
        this.inside.emit(target);
      } else {
        this.outside.emit(target);
      }
    }
  }
}
