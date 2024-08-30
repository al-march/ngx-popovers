import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverAnchor, PopoverClose, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PopoverAnchor,
    PopoverClose,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html'
})
export class IndexComponent {
}
