import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightComponent } from '@demo/core/highlight';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { CodeExampleTabsComponent } from "../../ui/components/code-example-tabs/code-example-tabs.component";
import { DocPageComponent } from "../../ui/components/doc-page/doc-page.component";
import { DocSectionComponent } from "../../ui/components/doc-page/doc-section/doc-section.component";
import { SubTitleComponent } from "../../ui/components/doc-page/sub-title/sub-title.component";

@Component({
  selector: 'ngx-popovers-page-arrow',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    HighlightComponent,
    DocPageComponent,
    DocSectionComponent,
    SubTitleComponent,
    CodeExampleTabsComponent,
    AsyncPipe
],
  templateUrl: './page-arrow.component.html',
  styleUrl: './page-arrow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageArrowComponent {
  example1 = {
    EXAMPLE: import('./examples/1/index.component').then(m => m.IndexComponent),
    HTML: import('./examples/1/index.component.html?raw').then(m => m.default),
    TS: import('./examples/1/index.component.ts?raw').then(m => m.default),
    SCSS: import('./examples/1/index.component.scss?raw').then(m => m.default)
  };

  configExample = import('./examples/2/index.config.ts?raw').then(m => m.default);
}
