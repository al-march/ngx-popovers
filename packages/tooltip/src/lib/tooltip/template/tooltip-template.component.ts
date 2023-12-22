import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { OpenCloseState, PortalComponent } from '@ngx-popovers/core';
import { NGX_TOOLTIP_COMPONENT } from '../core/tooltip.injections';

@Component({
  selector: 'ngx-tooltip-template',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './tooltip-template.component.html',
  styleUrl: './tooltip-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.closed]': '!isOpen'
  }
})
export class TooltipTemplate {
  @Input()
  text = '';

  @Input()
  isOpen = false;

  @Output()
  showAnimationEnd = new EventEmitter();

  @Output()
  hideAnimationEnd = new EventEmitter();

  @Output()
  hovered = new EventEmitter<boolean>();

  isHovered = signal(false);

  component = inject(NGX_TOOLTIP_COMPONENT);

  onMousemove() {
    if (!this.isHovered()) {
      this.isHovered.set(true);
      this.hovered.emit(true);
    }
  }

  onMouseleave() {
    if (this.isHovered()) {
      this.isHovered.set(false);
      this.hovered.emit(false);
    }
  }
}
