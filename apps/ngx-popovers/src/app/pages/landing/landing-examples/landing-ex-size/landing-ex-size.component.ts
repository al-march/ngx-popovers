import { ChangeDetectionStrategy, Component, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent, isServer, offset, size } from '@ngx-popovers/core';

@Component({
  selector: 'landing-ex-size',
  standalone: true,
  imports: [CommonModule, FloatingComponent],
  templateUrl: './landing-ex-size.component.html',
  styleUrl: './landing-ex-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExSizeComponent {
  isBrowser = !isServer();
  reference = viewChild<ElementRef<HTMLElement>>('reference');

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

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        this.reference()?.nativeElement.scrollIntoView({
          block: 'center'
        });
      });
    }
  }
}
