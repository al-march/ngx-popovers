import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { isServer } from '@ngx-popovers/core';

@Directive({
  selector: '[demoScrollToCenter]',
  standalone: true
})
export class ScrollToCenterDirective implements AfterViewInit {
  readonly isServer = isServer();
  readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  get parent() {
    return this.el.nativeElement.parentElement;
  }

  ngAfterViewInit() {
    if (this.isServer) {
      return;
    }

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
