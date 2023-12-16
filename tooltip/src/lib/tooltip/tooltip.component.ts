import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: '[ngx-tooltip]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('closed => open', [animate('0.15s')]),
      transition('open => closed', [animate('0.15s')]),
    ]),
  ],
  host: {
    '[style.left.px]': 'left',
    '[style.top.px]': 'top',
    '[class.closing]': '!isOpen',
  },
})
export class TooltipComponent {
  @Input()
  text = '';

  @Input()
  left = 0;

  @Input()
  top = 0;

  @Input()
  isOpen = false;

  @Output()
  hideAnimationEnd = new EventEmitter();

  onHideAnimationEnd($event: AnimationEvent) {
    if ($event.toState === 'closed') {
      this.hideAnimationEnd.emit();
    }
  }
}
