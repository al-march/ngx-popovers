import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { HighlightComponent } from '@demo/core/highlight';
import { RouterLink } from '@angular/router';
import { Arrow, FloatingComponent, Middleware, offset, Placement } from '@ngx-popovers/core';
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

  <ngx-arrow padding="12" />
</ngx-floating>
`.trim();

const configExample = `
export const FloatingConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxFloatingConfig({
    placement: 'top-end',
    autoUpdate: false,
    middleware: [
      flip(),
      shift(),
      offset(8),
    ]
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
    Arrow,
    FloatingComponent
  ],
  templateUrl: './page-floating.component.html',
  styleUrl: './page-floating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
