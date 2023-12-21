import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { OpenCloseState, openClose, PortalComponent } from '@ngx-popovers/core';
import { NGX_TOOLTIP_COMPONENT } from '../core/tooltip.injections';

@Component({
  selector: 'ngx-tooltip-template',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './tooltip-template.component.html',
  styleUrl: './tooltip-template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openClose],
  host: {
    '[class.closing]': '!isOpen'
  }
})
export class TooltipTemplate implements OnInit, AfterViewInit, OnChanges {
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
  animation = signal<OpenCloseState>(OpenCloseState.CLOSE);

  component = inject(NGX_TOOLTIP_COMPONENT);

  ngOnInit() {
    this.animation.set(OpenCloseState.CLOSE);
  }

  ngAfterViewInit() {
    this.animation.set(OpenCloseState.OPEN);
  }

  ngOnChanges() {
    const animation = this.isOpen
      ? OpenCloseState.OPEN
      : OpenCloseState.CLOSE;
    this.animation.set(animation);
  }

  onAnimationEmit($event: AnimationEvent) {
    switch ($event.toState) {
      case OpenCloseState.OPEN:
        this.showAnimationEnd.emit();
        break;
      case OpenCloseState.CLOSE:
        this.hideAnimationEnd.emit();
        break;
    }
  }

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
