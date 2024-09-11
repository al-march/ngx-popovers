import { Directive, ElementRef, HostListener, output } from '@angular/core';
import { isContainElement } from '../utils/utils';

export interface ClickOutsideEvent {
  readonly inside: boolean;
  readonly outside: boolean;
  readonly target: EventTarget;
}

@Directive({
  selector: '[ngxClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  ngxClickOutside = output<ClickOutsideEvent>();
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
        this.ngxClickOutside.emit({
          inside: true,
          outside: false,
          target,
        })
      } else {
        this.outside.emit(target);
        this.ngxClickOutside.emit({
          inside: false,
          outside: true,
          target,
        })
      }
    }
  }
}
