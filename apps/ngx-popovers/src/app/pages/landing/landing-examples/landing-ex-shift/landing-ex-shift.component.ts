import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatingComponent, offset, shift } from '@ngx-popovers/core';
import { ScrollToCenterDirective } from '@demo/pages/landing/tools';

@Component({
  selector: 'landing-ex-shift',
  standalone: true,
  imports: [
    FloatingComponent,
    FormsModule,
    ScrollToCenterDirective
  ],
  templateUrl: './landing-ex-shift.component.html',
  styleUrl: './landing-ex-shift.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExShiftComponent {
  middleware = [
    shift(),
    offset(5)
  ];
}
