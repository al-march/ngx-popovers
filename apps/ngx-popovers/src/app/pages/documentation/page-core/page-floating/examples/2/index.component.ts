import { Component, ElementRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, FloatingComponent, Middleware, offset, Placement } from '@ngx-popovers/core';
import { flip } from '@floating-ui/dom';

@Component({
  selector: 'demo-index',
  standalone: true,
  imports: [
    CommonModule,
    Arrow,
    FloatingComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  readonly elementRef: HTMLElement = inject(ElementRef).nativeElement;
  readonly placement = signal<Placement>('left');

  readonly placementList: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];

  readonly middleware: Middleware[] = [
    offset(10),
    flip({
      fallbackStrategy: 'initialPlacement'
    })
  ];
}
