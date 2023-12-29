import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { HighlightComponent } from '../../../core/highlight/highlight.component';
import { RouterLink } from '@angular/router';
import { Placement } from '@floating-ui/dom';
import { FloatingArrowComponent, FloatingComponent } from '@ngx-popovers/core';

const example = `
<div #trigger>
  <p>Trigger content</p>
</div>

<ngx-floating
  [trigger]="trigger"
  [placement]="'bottom'"
  [offset]="10"
  [flip]="{mainAxis: false}"
  [shift]="{mainAxis: true}"
>
  <div class="floating">
    <p>Floating content</p>
  </div>
</ngx-floating>
`.trim();

const configExample = `
export const FloatingConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxFloatingConfig({
    placement: 'top-end',
    arrow: true
  })
};
`.trim();

@Component({
  selector: 'ngx-popovers-page-floating',
  standalone: true,
  imports: [CommonModule, TitleComponent, HighlightComponent, RouterLink, FloatingArrowComponent, FloatingComponent],
  templateUrl: './page-floating.component.html',
  styleUrl: './page-floating.component.scss'
})
export class PageFloatingComponent {
  example = example;
  configExample = configExample;

  placement = signal<Placement>('left');
  floating = signal(false);

  placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
