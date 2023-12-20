import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal } from '@angular/core';
import { PortalComponent } from '@ngx-popovers/core';
import { TooltipTemplate } from './template/tooltip-template.component';
import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@floating-ui/dom';
import { FloatingComponent } from '@ngx-popovers/floating';
import { debounceTime, filter, fromEvent, tap } from 'rxjs';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [PortalComponent, TooltipTemplate, FloatingComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTooltip {
  @Input('ngxTooltip')
  tooltipText = '';

  @Input()
  placement: Placement = 'bottom';

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions>;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  @Input()
  offset?: OffsetOptions = 4;

  /**
   * Time delay before the tooltip is displayed
   */
  @Input()
  debounce = 100;

  /**
   * Emits when tooltip show animation ends
   */
  @Output()
  showEnd = new EventEmitter();

  /**
   * Emits when tooltip hide animation ends
   */
  @Output()
  hideEnd = new EventEmitter();

  isTooltipCreated = signal(false);
  isTooltipShowing = signal(false);
  isTriggerHovered = signal(false);
  isTooltipHovered = signal(false);

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(private el: ElementRef) {
    this.mouseMoveListener();
    this.mouseleaveListener();
  }

  mouseMoveListener() {
    fromEvent(this.el.nativeElement, 'mousemove').pipe(
      tap(() => this.isTriggerHovered.set(true)),
      filter(() => !this.isTooltipCreated()),
      debounceTime(this.debounce),
      filter(() => this.isTriggerHovered())
    ).subscribe(() => {
      if (this.isTooltipCreated()) {
        return;
      }

      this.show();
      this.showTooltip();
    });
  }

  mouseleaveListener() {
    fromEvent(this.el.nativeElement, 'mouseleave').pipe(
      tap(() => this.isTriggerHovered.set(false)),
      filter(() => this.isTooltipCreated()),
      debounceTime(this.debounce),
      filter(() => !this.isTooltipHovered())
    ).subscribe(() => {
      this.hideTooltip();
    });
  }

  onOpenAnimationEnd() {
    this.showEnd.emit();
  }

  onHideAnimationEnd() {
    this.hide();
    this.hideEnd.emit();
  }

  show() {
    this.isTooltipCreated.set(true);
  }

  showTooltip() {
    this.isTooltipShowing.set(true);
  }

  hide() {
    this.isTooltipCreated.set(false);
  }

  hideTooltip() {
    this.isTooltipShowing.set(false);
  }

  setTooltipHovered($event: boolean) {
    if (!$event) {
      this.hideTooltip();
    }
    this.isTooltipHovered.set($event);
  }
}
