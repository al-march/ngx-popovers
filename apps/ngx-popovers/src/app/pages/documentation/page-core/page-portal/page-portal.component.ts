import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HighlightComponent } from '@demo/core/highlight';
import { TitleComponent } from '@demo/pages/documentation/ui/components';
import { PortalComponent } from '@ngx-popovers/core';
import { CodeExampleTabsComponent } from "../../ui/components/code-example-tabs/code-example-tabs.component";
import { SubTitleComponent } from "../../ui/components/page-title/sub-title.component";

@Component({
  selector: 'ngx-popovers-page-portal',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    HighlightComponent,
    PortalComponent,
    CodeExampleTabsComponent,
    SubTitleComponent,
    RouterLink
  ],
  templateUrl: './page-portal.component.html',
  styleUrl: './page-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePortalComponent {
  example1 = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/1/index.component.scss?raw').then(m => m.default),
  };

  example2 = {
    EXAMPLE: import('./examples/2/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/2/index.component.html?raw').then(m => m.default),
    TS: import('./examples/2/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/2/index.component.scss?raw').then(m => m.default),
  };
}
