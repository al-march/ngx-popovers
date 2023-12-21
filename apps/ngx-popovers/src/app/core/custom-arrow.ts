import { Component, Provider } from '@angular/core';
import { FloatingArrowBase, NGX_FLOATING_ARROW_COMPONENT } from '@ngx-popovers/floating';

@Component({
  standalone: true,
  template: `
    <div
      style="
        width: 5px;
        height: 5px;
        transform: rotate(45deg);
        background: indianred;
      "
    ></div>
  `
})
export class CustomArrow extends FloatingArrowBase {
}

export const ArrowProvider: Provider = {
  provide: NGX_FLOATING_ARROW_COMPONENT,
  useValue: CustomArrow
};
