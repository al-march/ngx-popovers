import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverClose, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PopoverClose,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
}
