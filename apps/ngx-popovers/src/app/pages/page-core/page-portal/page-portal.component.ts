import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { HighlightComponent } from '../../../core/highlight/highlight.component';


const portalUsageHtml =
  `
<ngx-portal>
  <p>It will be displayed as the last child of the body</p>
</ngx-portal>
`.trim();

const portalUsageWithBindHtml =
  `
<div #element>
  <p>Element</p>
</div>

<ngx-portal [bindTo]="element">
  <p>It will be displayed as the last child of the element</p>
</ngx-portal>
`.trim();

@Component({
  selector: 'ngx-popovers-page-portal',
  standalone: true,
  imports: [CommonModule, TitleComponent, HighlightComponent],
  templateUrl: './page-portal.component.html',
  styleUrl: './page-portal.component.scss'
})
export class PagePortalComponent {
  portalUsageHtml = portalUsageHtml;
  portalUsageWithBindHtml = portalUsageWithBindHtml;

  constructor() {
  }

}
