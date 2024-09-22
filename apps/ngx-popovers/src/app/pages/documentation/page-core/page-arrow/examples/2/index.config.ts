import { Component, Provider } from "@angular/core";
import { ArrowBase, NGX_ARROW_COMPONENT } from "@ngx-popovers/core";

@Component({
  standalone: true,
  template: `
    <div
      style="
        width: 12px;
        height: 12px;
        transform: rotate(45deg);
      "
      class="bg-primary"
    ></div>
  `
})
export class CustomArrow extends ArrowBase {
}

export const ArrowProvider: Provider = {
  provide: NGX_ARROW_COMPONENT,
  useValue: CustomArrow
};