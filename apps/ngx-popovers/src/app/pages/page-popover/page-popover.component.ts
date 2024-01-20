import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { CoreIcon } from '../../routes-icons';
import { FormsModule } from '@angular/forms';
import { HighlightComponent } from '../../core/highlight/highlight.component';
import { RouterLink } from '@angular/router';
import { Arrow, Placement } from '@ngx-popovers/core';
import { PopoverCloseDirective, PopoverComponent } from '@ngx-popovers/popover';
import { ExampleComponent } from '../../template/example/example.component';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { WarningComponent } from '../../shared/warning/warning.component';

const usageExample = `
<button #anchor (click)="popover.toggle()">
  Popover
</button>

<ngx-popover
 #popover
 [anchor]="anchor"
>
  <div class="popover">
    <p>I am popover!</p>
    <button (click)="popover.close()">
      Close
    </button>
  </div>
</ngx-popover>
`.trim();

const configExample = `
import { Provider } from '@angular/core';
import { NGX_POPOVER_CONFIG, NgxPopoverConfig } from '@ngx-popovers/popover';
/**
 * You have to install core to import middleware.
 * Version of core is the same as @ngx-popovers/popover
 */
import { flip, offset, shift } from '@ngx-popovers/core';

export const PopoverConfigProvider: Provider = {
  provide: NGX_POPOVER_CONFIG,
  useValue: new NgxPopoverConfig({
    placement: 'top-end',
    arrow: true,
    closeOnClickedOutside: true,
    /* Middleware list from floating-ui */
    middleware: [
      flip(),
      shift(),
      offset(8),
    ]
  })
};
`.trim();

@Component({
  selector: 'ngx-popovers-page-popover',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    CoreIcon,
    FormsModule,
    HighlightComponent,
    RouterLink,
    PopoverComponent,
    ExampleComponent,
    NgxTooltip,
    WarningComponent,
    Arrow,
    PopoverCloseDirective
  ],
  templateUrl: './page-popover.component.html',
  styleUrl: './page-popover.component.scss'
})
export class PagePopoverComponent {
  usageExample = usageExample;
  configExample = configExample;

  popoverValue = true;

  placement = signal<Placement>('left');

  placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
