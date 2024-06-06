import { ChangeDetectionStrategy, Component, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flip, FloatingComponent, isServer, offset } from '@ngx-popovers/core';

@Component({
  selector: 'landing-ex-flip',
  standalone: true,
  imports: [CommonModule, FloatingComponent],
  templateUrl: './landing-ex-flip.component.html',
  styleUrl: './landing-ex-flip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExFlipComponent {
  isBrowser = !isServer();
  reference = viewChild<ElementRef<HTMLElement>>('reference');

  middleware = [
    flip(),
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
