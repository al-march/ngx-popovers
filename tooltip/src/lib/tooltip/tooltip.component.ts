import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[ngx-tooltip]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  host: {
    '[style.left.px]': 'left',
    '[style.top.px]': 'top',
  },
})
export class TooltipComponent {
  @Input()
  text = '';

  @Input()
  left = 0;

  @Input()
  top = 0;
}
