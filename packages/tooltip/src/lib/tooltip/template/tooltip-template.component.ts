import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_TOOLTIP_COMPONENT } from '../core/tooltip.injections';

@Component({
  selector: 'ngx-tooltip-template',
  imports: [CommonModule],
  templateUrl: './tooltip-template.component.html',
  styleUrl: './tooltip-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipTemplate {
  @Input()
  text = '';

  @Input()
  component = inject(NGX_TOOLTIP_COMPONENT);

  @Input()
  template?: TemplateRef<void>;

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
