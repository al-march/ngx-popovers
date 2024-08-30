import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, Placement } from '@ngx-popovers/core';
import { PopoverClose, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    Arrow,
    PopoverClose,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  placements: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
