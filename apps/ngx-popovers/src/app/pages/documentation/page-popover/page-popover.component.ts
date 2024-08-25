import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { CoreIcon } from '@demo/app-routes-icons';
import { FormsModule } from '@angular/forms';
import { HighlightComponent } from '@demo/core/highlight';
import { RouterLink } from '@angular/router';
import { Arrow, Placement } from '@ngx-popovers/core';
import { ExampleComponent } from '@demo/template/example';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { WarningComponent } from '@demo/shared/warning';
import { PopoverModule } from '@ngx-popovers/popover';
import { IndexComponent } from '@demo/pages/documentation/page-popover/examples/1/index.component';
import { CodeExampleTabsComponent } from '@demo/pages/documentation/ui/code-example-tabs';

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
    ExampleComponent,
    NgxTooltip,
    WarningComponent,
    Arrow,
    PopoverModule,
    IndexComponent,
    CodeExampleTabsComponent
  ],
  templateUrl: './page-popover.component.html',
  styleUrl: './page-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePopoverComponent {
  configExample = configExample;

  firstExample = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default)
  };

  popoverValue = true;

  placement = signal<Placement>('left');

  placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
