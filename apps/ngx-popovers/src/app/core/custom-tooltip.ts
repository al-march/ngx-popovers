import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG, NgxTooltipConfig, TooltipBase } from '@ngx-popovers/tooltip';

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
      border-radius: 4px;
    }
  `,
  template: `
      <div class="my-tooltip">
      <span><b>text:</b> {{ text }}</span>
    </div>
  `
})
export class CustomTooltip extends TooltipBase {
}

export const TooltipProvider: Provider = {
  provide: NGX_TOOLTIP_COMPONENT,
  useValue: CustomTooltip
};

export const TooltipConfigProvider: Provider = {
  provide: NGX_TOOLTIP_CONFIG,
  useValue: new NgxTooltipConfig({
    debounce: 50,
    placement: 'top-end'
  })
};
