import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { HighlightComponent } from '../../../core/highlight/highlight.component';
import { RouterLink } from '@angular/router';
import { FloatingArrowComponent, FloatingComponent, Middleware, offset, Placement } from '@ngx-popovers/core';
import { flip } from '@floating-ui/dom';

const example = `
<div #trigger>
  <p>Trigger content</p>
</div>

<ngx-floating
  [trigger]="trigger"
  [placement]="'bottom'"
  [middleware]="middleware"
  bindTo=".body"
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
    offset: 10,
    autoUpdate: false
  })
};
`.trim();

@Component({
  selector: 'ngx-popovers-page-floating',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    HighlightComponent,
    RouterLink,
    FloatingArrowComponent,
    FloatingComponent
  ],
  templateUrl: './page-floating.component.html',
  styleUrl: './page-floating.component.scss'
})
export class PageFloatingComponent {
  example = example;
  configExample = configExample;

  middleware: Middleware[] = [
    offset(10),
    flip({
      fallbackStrategy: 'initialPlacement'
    })
  ];

  placement = signal<Placement>('left');
  floating = signal(false);

  placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
