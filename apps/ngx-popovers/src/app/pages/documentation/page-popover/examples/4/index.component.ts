import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { PopoverAnchor, PopoverClose, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  imports: [
    CommonModule,
    NgxTooltip,
    PopoverAnchor,
    PopoverClose,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html'
})
export class IndexComponent {
}
