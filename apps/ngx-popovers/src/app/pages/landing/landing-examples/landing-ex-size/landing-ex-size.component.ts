import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent, offset, size } from '@ngx-popovers/core';
import { ScrollToCenterDirective } from '@demo/pages/landing/tools';

@Component({
  selector: 'landing-ex-size',
  imports: [CommonModule, FloatingComponent, ScrollToCenterDirective],
  templateUrl: './landing-ex-size.component.html',
  styleUrl: './landing-ex-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExSizeComponent {
  middleware = [
    size({
      apply({ availableWidth, availableHeight, elements }) {
        // Change styles, e.g.
        Object.assign(elements.floating.style, {
          maxWidth: `${availableWidth}px`,
          height: `${availableHeight}px`
        });
      }
    }),
    offset(5)
  ];
}
