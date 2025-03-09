import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  imports: [
    CommonModule,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
}
