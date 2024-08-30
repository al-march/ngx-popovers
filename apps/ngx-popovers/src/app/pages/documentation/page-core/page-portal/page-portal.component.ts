import { AfterViewInit, ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { HighlightComponent } from '@demo/core/highlight';
import { PortalComponent } from '@ngx-popovers/core';

const portalUsageHtml = `
import { PortalComponent } from '@ngx-popovers/core';

@Component({
  selector: 'ngx-portal-example',
  standalone: true,
  imports: [PortalComponent],
  template: \`
    <ngx-portal>
      <p>It will be displayed as the last child of the body</p>
    </ngx-portal>
  \`,
})
`.trim();

const portalUsageWithBindHtml = `
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
  imports: [CommonModule, TitleComponent, HighlightComponent, PortalComponent],
  templateUrl: './page-portal.component.html',
  styleUrl: './page-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagePortalComponent implements AfterViewInit {
  portalUsageHtml = portalUsageHtml;
  portalUsageWithBindHtml = portalUsageWithBindHtml;

  sections = [
    'sect1',
    'sect2',
    'sect3',
    'sect4'
  ] as const;
  section = signal('');
  selector = computed(() => this.section() ? `#${this.section()} div` : '');

  ngAfterViewInit() {
    this.section.set(this.sections[0]);
  }
}
