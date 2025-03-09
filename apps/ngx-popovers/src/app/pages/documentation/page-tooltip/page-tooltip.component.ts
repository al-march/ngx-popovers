import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoreIcon } from '@demo/app-routes-icons';
import { HighlightComponent } from '@demo/core/highlight';
import { CodeExampleTabsComponent, SubTitleComponent } from '@demo/pages/documentation/ui/components';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { WarningComponent } from '@demo/shared/warning';
import { ExampleComponent } from '@demo/template/example';
import { Placement } from '@floating-ui/dom';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { DocPageComponent } from '../ui/components/doc-page/doc-page.component';
import { DocSectionComponent } from '../ui/components/doc-page/doc-section/doc-section.component';


@Component({
  selector: 'ngx-popovers-page-tooltip',
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
    SubTitleComponent,
    DocPageComponent,
    DocSectionComponent
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
