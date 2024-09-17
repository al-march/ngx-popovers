import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Arrow, Placement } from '@ngx-popovers/core';
import { PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    Arrow,
    PopoverComponent,
    PopoverTemplate
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  placements: Placement[] = [
    'left',
    'bottom',
    'right',
    'top'
  ];
}
