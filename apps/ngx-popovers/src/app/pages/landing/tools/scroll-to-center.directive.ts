import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[demoScrollToCenter]',
  standalone: true
})
export class ScrollToCenterDirective implements AfterViewInit {
  readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  get parent() {
    return this.el.nativeElement.parentElement;
  }

  ngAfterViewInit() {
    const container = this.parent;
    const element = this.el?.nativeElement;

    if (container && element) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollOffset = element.offsetTop - container.offsetTop - (containerRect.height / 2) + (elementRect.height / 2);
      container.scrollTo({ top: scrollOffset });
    }
  }
}
