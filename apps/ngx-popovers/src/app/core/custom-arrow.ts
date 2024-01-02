import { Component, Provider } from '@angular/core';
import { FloatingArrowBase, NGX_FLOATING_ARROW_COMPONENT } from '@ngx-popovers/core';

@Component({
  standalone: true,
  template: `
    <div
      style="
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
      "
      class="bg-primary"
    ></div>
  `
})
export class CustomArrow extends FloatingArrowBase {
}

export const ArrowProvider: Provider = {
  provide: NGX_FLOATING_ARROW_COMPONENT,
  useValue: CustomArrow
};
