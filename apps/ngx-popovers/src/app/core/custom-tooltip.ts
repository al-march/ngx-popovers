import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG, NgxTooltipConfig, TooltipBase } from '@ngx-popovers/tooltip';
import { flip, offset, shift } from '@floating-ui/dom';

@Component({
  standalone: true,
  template: `
    <div class="p-2 rounded bg-base-300 border border-base-content drop-shadow-2xl">
      <span>{{ text }}</span>
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
    placement: 'top',
    arrowPadding: 4,
    middleware: [
      flip(),
      shift(),
      offset(8),
    ]
  })
};
