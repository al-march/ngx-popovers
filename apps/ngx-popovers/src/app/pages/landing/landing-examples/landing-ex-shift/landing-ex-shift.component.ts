import { ChangeDetectionStrategy, Component, effect, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingComponent, isServer, offset, shift } from '@ngx-popovers/core';

@Component({
  selector: 'landing-ex-shift',
  standalone: true,
  imports: [
    FloatingComponent,
    FormsModule
  ],
  templateUrl: './landing-ex-shift.component.html',
  styleUrl: './landing-ex-shift.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExShiftComponent {
  isBrowser = !isServer();
  reference = viewChild<ElementRef<HTMLElement>>('reference');

  middleware = [
    shift(),
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
