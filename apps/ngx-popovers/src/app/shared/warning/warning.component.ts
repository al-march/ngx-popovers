import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dm-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningComponent {
}
