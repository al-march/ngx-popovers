import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoreIcon } from '@demo/app-routes-icons';
import { HighlightComponent } from '@demo/core/highlight';
import { CodeExampleTabsComponent } from '@demo/pages/documentation/ui/components/code-example-tabs';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { WarningComponent } from '@demo/shared/warning';
import { Placement } from '@ngx-popovers/core';
import { PopoverModule } from '@ngx-popovers/popover';
import { DocPageComponent } from '../ui/components/doc-page/doc-page.component';
import { DocSectionComponent } from '../ui/components/doc-page/doc-section/doc-section.component';
import { SubTitleComponent } from '../ui/components/doc-page/sub-title/sub-title.component';


@Component({
  selector: 'ngx-popovers-page-popover',
  imports: [
    CommonModule,
    TitleComponent,
    CoreIcon,
    FormsModule,
    HighlightComponent,
    RouterLink,
    WarningComponent,
    PopoverModule,
    CodeExampleTabsComponent,
    DocPageComponent,
    DocSectionComponent,
    SubTitleComponent
  ],
  templateUrl: './page-popover.component.html',
  styleUrl: './page-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePopoverComponent {
  example1 = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default)
  };

  example2 = {
    EXAMPLE: import('./examples/2/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/2/index.component.html?raw').then(m => m.default),
    TS: import('./examples/2/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/2/index.component.scss?raw').then(m => m.default)
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

  configExample = import('./examples/config.example.ts?raw').then(m => m.default);

  popoverValue = true;

  placement = signal<Placement>('left');
}
