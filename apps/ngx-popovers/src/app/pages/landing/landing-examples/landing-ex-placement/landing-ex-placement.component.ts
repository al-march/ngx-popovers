import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatingComponent, Placement } from '@ngx-popovers/core';

@Component({
  selector: 'landing-ex-placement',
  standalone: true,
  imports: [
    FloatingComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './landing-ex-placement.component.html',
  styleUrl: './landing-ex-placement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingExPlacementComponent {
  control = new FormControl<Placement>('top');

  placement = signal<Placement>('top');
}
