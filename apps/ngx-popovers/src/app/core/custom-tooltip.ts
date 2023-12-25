import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG, NgxTooltipConfig, TooltipBase } from '@ngx-popovers/tooltip';

@Component({
  standalone: true,
  template: `
      <div class="p-2 rounded bg-base-200 border border-warning shadow-xl">
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
    placement: 'top-end',
    arrowPadding: 4
  })
};
