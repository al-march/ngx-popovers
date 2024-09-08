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
import { CodeExampleTabsComponent } from '@demo/pages/documentation/ui/components/code-example-tabs';


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

  configExample = import('./examples/config.example.ts?raw').then(m => m.default);

  popoverValue = true;

  placement = signal<Placement>('left');
}
