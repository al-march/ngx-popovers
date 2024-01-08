import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Input()
  insideElements: HTMLElement[] = [];

  @Output()
  inside = new EventEmitter<EventTarget>();

  @Output()
  outside = new EventEmitter<EventTarget>();

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClick(event: PointerEvent) {
    const target = event.target;
    if (target) {
      const isContains = this.el.nativeElement.contains(target);
      if (isContains) {
        this.inside.emit(target);
      } else {
        this.outside.emit(target);
      }
    }
  }
}
