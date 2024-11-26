import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDialog } from '@ngx-popovers/dialog';

@Component({
  selector: 'demo-index',
  standalone: true,
  imports: [CommonModule, NgxDialog],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  open = false;
}
