import { Directive, TemplateRef } from '@angular/core';

/**
 * Angular doesn't destroy elements in <ng-content />, so
 * the PopoverTemplate component uses for conditional content projection.
 *
 * The popover needs in a conditional projection because the components inside
 * must execute all of their lifecycle hooks.
 * And they must be destroyed when the popover closes
 *
 * @See https://angular.io/guide/content-projection#conditional-content-projection
 */
@Directive({
  selector: '[ngx-popover-template]',
  standalone: true
})
export class PopoverTemplate {
  constructor(
    public templateRef: TemplateRef<unknown>
  ) {}
}
