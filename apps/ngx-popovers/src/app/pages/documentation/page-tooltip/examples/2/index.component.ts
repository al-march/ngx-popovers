import { CommonModule } from '@angular/common';
import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, NgxTooltip, TooltipBase } from '@ngx-popovers/tooltip';

/**
 * You have to install core to import middleware.
 * Version of the core is the same as the tooltip package.
 */
@Component({
  standalone: true,
  template: `
    <div class="p-2 rounded bg-accent text-accent-content">
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

@Component({
  selector: 'demo-index',
  imports: [CommonModule, NgxTooltip],
  providers: [TooltipProvider],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
}
