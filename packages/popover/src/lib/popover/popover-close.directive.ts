import { Directive, HostListener, inject } from '@angular/core';
import { PopoverComponent } from '@ngx-popovers/popover';

@Directive({
  selector: '[ngx-popover-close]',
  standalone: true
})
export class PopoverCloseDirective {
  popover = inject(PopoverComponent);

  @HostListener('click')
  onClick() {
    this.popover.close();
  }
}
