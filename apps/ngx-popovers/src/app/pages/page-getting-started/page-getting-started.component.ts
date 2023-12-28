import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { Placement } from '@floating-ui/dom';
import { FloatingArrowComponent, FloatingComponent } from '@ngx-popovers/floating';

@Component({
  selector: 'ngx-popovers-page-getting-started',
  standalone: true,
  imports: [CommonModule, TitleComponent, FloatingComponent, FloatingArrowComponent],
  templateUrl: './page-getting-started.component.html',
  styleUrl: './page-getting-started.component.scss'
})
export class PageGettingStartedComponent {
  placement = signal<Placement>('left');
  floating = signal(false);

  placementList: Placement[] = [
    'left-start',
    'left',
    'left-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'right-end',
    'right',
    'right-start',
    'top-end',
    'top',
    'top-start'
  ];
}
