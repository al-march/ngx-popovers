import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { HighlightComponent } from '@demo/core/highlight';
import { RouterLink } from '@angular/router';
import { Placement } from '@floating-ui/dom';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from '@demo/shared/warning';
import { ExampleComponent } from '@demo/template/example';
import { CoreIcon } from '@demo/app-routes-icons';
import { CodeExampleTabsComponent, SubTitleComponent } from '@demo/pages/documentation/ui/components';


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
    WarningComponent,
    ExampleComponent,
    CodeExampleTabsComponent,
    SubTitleComponent
  ],
  templateUrl: './page-tooltip.component.html',
  styleUrl: './page-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTooltipComponent {

  example1 = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default)
  };

  example2 = {
    EXAMPLE: import('./examples/2/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/2/index.component.html?raw').then(m => m.default),
    TS: import('./examples/2/index.component.ts?raw').then(m => m.default)
  };

  example3 = {
    EXAMPLE: import('./examples/3/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/3/index.component.html?raw').then(m => m.default),
    TS: import('./examples/3/index.component.ts?raw').then(m => m.default)
  };

  example4 = {
    EXAMPLE: import('./examples/4/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/4/index.component.html?raw').then(m => m.default),
    TS: import('./examples/4/index.component.ts?raw').then(m => m.default)
  };

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
