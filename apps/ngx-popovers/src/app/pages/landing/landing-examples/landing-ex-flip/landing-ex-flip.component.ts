import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flip, FloatingComponent, offset } from '@ngx-popovers/core';
import { ScrollToCenterDirective } from '@demo/pages/landing/tools';

@Component({
  selector: 'landing-ex-flip',
  standalone: true,
  imports: [CommonModule, FloatingComponent, ScrollToCenterDirective],
  templateUrl: './landing-ex-flip.component.html',
  styleUrl: './landing-ex-flip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExFlipComponent {
  middleware = [
    flip(),
    offset(5)
  ];
}
