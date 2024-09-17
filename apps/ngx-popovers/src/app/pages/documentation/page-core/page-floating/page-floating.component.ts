import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { RouterLink } from '@angular/router';
import { Arrow } from '@ngx-popovers/core';
import {
  CodeExampleTabsComponent, DocSectionComponent,
  SubTitleComponent
} from 'apps/ngx-popovers/src/app/pages/documentation/ui/components';
import { DocPageComponent } from '@demo/pages/documentation/ui/components/doc-page/doc-page.component';

@Component({
  selector: 'ngx-popovers-page-floating',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    RouterLink,
    Arrow,
    CodeExampleTabsComponent,
    DocPageComponent,
    SubTitleComponent,
    DocSectionComponent
  ],
  templateUrl: './page-floating.component.html',
  styleUrl: './page-floating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageFloatingComponent {

  example1 = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/1/index.component.scss?raw').then(m => m.default)
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
    TS: import('./examples/3/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/3/index.component.scss?raw').then(m => m.default)
  };
}
