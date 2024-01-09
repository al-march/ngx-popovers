import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { CoreIcon } from '../../routes-icons';
import { HighlightComponent } from '../../core/highlight/highlight.component';
import { RouterLink } from '@angular/router';
import { Placement } from '@floating-ui/dom';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from '../../shared/warning/warning.component';

const usageExample = `
<button
  ngxTooltip="Tooltip text"
  placement="top-start"
  arrow
>
  Button with tooltip
</button>
`.trim();

const configExample = `
import { Provider } from '@angular/core';
import { NGX_TOOLTIP_CONFIG, NgxTooltipConfig } from '@ngx-popovers/tooltip';
/**
 * You have to install core to import middleware.
 * Version of the core is the same as the tooltip package.
 */
import { flip, offset, shift } from '@ngx-popovers/core';

export const TooltipConfigProvider: Provider = {
  provide: NGX_TOOLTIP_CONFIG,
  useValue: new NgxTooltipConfig({
    debounce: 50,
    placement: 'top-end',
    /* Middleware list from floating-ui */
    middleware: [
      flip(),
      shift(),
      offset(8)
    ]
  })
};
`.trim();

const configComponentExample = `
import { Component, Provider } from '@angular/core';
import { NGX_TOOLTIP_COMPONENT, TooltipBase } from '@ngx-popovers/tooltip';

@Component({
  standalone: true,
  template: \`
    <div class="p-2 rounded bg-base-300 border border-base-content drop-shadow-2xl">
      <span>{{ text }}</span>
    </div>
  \`
})
export class CustomTooltip extends TooltipBase {
}

/* Configure default tooltip component */
export const TooltipProvider: Provider = {
  provide: NGX_TOOLTIP_COMPONENT,
  useValue: CustomTooltip
};
`.trim();

@Component({
  selector: 'ngx-popovers-page-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    HighlightComponent,
    RouterLink,
    NgxTooltip,
    FormsModule,
    CoreIcon,
    WarningComponent
  ],
  templateUrl: './page-tooltip.component.html',
  styleUrl: './page-tooltip.component.scss'
})
export class PageTooltipComponent {

  usageExample = usageExample;
  configExample = configExample;
  configComponentExample = configComponentExample;

  placement: Placement = 'top';
  debounce = 120;
  arrow = true;
  value = false;

  readonly placementList: Placement[] = [
    'left',
    'left-end',
    'left-start',
    'top',
    'top-end',
    'top-start',
    'right',
    'right-end',
    'right-start',
    'bottom',
    'bottom-end',
    'bottom-start'
  ];
}
