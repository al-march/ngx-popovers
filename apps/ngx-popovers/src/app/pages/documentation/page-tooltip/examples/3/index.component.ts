import { Component, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_TOOLTIP_CONFIG, NgxTooltip, NgxTooltipConfig } from '@ngx-popovers/tooltip';
/**
 * You have to install core to import middleware.
 * Version of the core is the same as the tooltip package.
 */
import { flip, offset, shift } from '@ngx-popovers/core';

export const TooltipConfigProvider: Provider = {
  provide: NGX_TOOLTIP_CONFIG,
  useValue: new NgxTooltipConfig({
    debounce: 50,
    placement: 'right-end',
    /* Middleware list from floating-ui */
    middleware: [
      flip(),
      shift(),
      offset(22)
    ]
  })
};

@Component({
  selector: 'demo-index',
  standalone: true,
  imports: [CommonModule, NgxTooltip],
  providers: [TooltipConfigProvider],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
}
