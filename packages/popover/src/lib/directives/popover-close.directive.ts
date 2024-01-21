import { Directive, HostListener, inject } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';


/**
 * The PopoverClose directive provides an ease-to-use method
 * for closing a popover within its template
 *
 * @example
 *
 * <ngx-popover>
 *   <button>Trigger</button>
 *
 *   <ng-template ngx-popover-template>
 *     <p>Lorem ipsum dolor.</p>
 *     <button ngx-popover-close>Close</button>
 *   </ng-template>
 * </ngx-popover>
 */
@Directive({
  selector: '[ngx-popover-close]',
  standalone: true
})
export class PopoverClose {
  popover = inject(PopoverComponent);

  @HostListener('click')
  onClick() {
    this.popover.close();
  }
}
