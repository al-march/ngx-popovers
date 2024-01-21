import { Directive, ElementRef, inject } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';

/**
 * The directive used for providing an anchor element in
 * popover content.
 */
@Directive({
  selector: '[ngx-popover-anchor]',
  standalone: true,
})
export class PopoverAnchor {
  popover = inject(PopoverComponent);

  constructor(
    public el: ElementRef
  ) {
    this.popover.anchor = el.nativeElement;
  }
}
