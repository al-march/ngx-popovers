import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from '@ngx-popovers/core';
import { NGX_TOOLTIP_COMPONENT } from '../core/tooltip.injections';

@Component({
  selector: 'ngx-tooltip-template',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './tooltip-template.component.html',
  styleUrl: './tooltip-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipTemplate {
  @Input()
  text = '';

  @Input()
  component = inject(NGX_TOOLTIP_COMPONENT);

  @Output()
  hovered = new EventEmitter<boolean>();

  isHovered = signal(false);

  @HostListener('mousemove', ['$event'])
  onMousemove() {
    if (!this.isHovered()) {
      this.isHovered.set(true);
      this.hovered.emit(true);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseleave() {
    if (this.isHovered()) {
      this.isHovered.set(false);
      this.hovered.emit(false);
    }
  }
}
