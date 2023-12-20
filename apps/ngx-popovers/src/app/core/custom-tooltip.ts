import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, TooltipBase } from '@ngx-popovers/tooltip';

@Component({
  standalone: true,
  styles: `
    .my-tooltip {
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #fff;
      border: 1px solid #dedede;
    }
  `,
  template: `
      <div class="my-tooltip">
      <span>I Custom Tooltip!</span>
      <span>text: {{ text }}</span>
    </div>
  `
})
export class CustomTooltip extends TooltipBase {
}

export const TooltipProvider: Provider = {
  provide: NGX_TOOLTIP_COMPONENT,
  useValue: CustomTooltip
};
