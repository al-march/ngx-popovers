import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTooltip } from '@ngx-popovers/tooltip';

@Component({
  selector: 'dm-footer',
  imports: [CommonModule, NgxTooltip],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
}
