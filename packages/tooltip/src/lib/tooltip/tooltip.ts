import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';
import { Derivable, FlipOptions, OffsetOptions, Placement, PortalComponent, ShiftOptions } from '@ngx-popovers/core';
import { FloatingComponent } from '@ngx-popovers/floating';
import { debounceTime, filter, fromEvent, tap } from 'rxjs';
import { TooltipTemplate } from './template/tooltip-template.component';
import { NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [PortalComponent, TooltipTemplate, FloatingComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTooltip {
  config = inject(NGX_TOOLTIP_CONFIG);

  @Input('ngxTooltip')
  tooltipText = '';

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions> = this.config.flip;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions> = this.config.shift;

  @Input()
  offset?: OffsetOptions = this.config.offset;

  /**
   * Time delay before the tooltip is displayed
   */
  @Input()
  debounce = this.config.debounce;

  /**
   * Show arrow or not
   */
  @Input()
  arrow = this.config.arrow;

  @Input()
  arrowPadding = this.config.arrowPadding;

  /**
   * Emits when tooltip shows
   */
  @Output()
  showEnd = new EventEmitter();

  /**
   * Emits when tooltip hides
   */
  @Output()
  hideEnd = new EventEmitter();

  isTooltipCreated = signal(false);
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
    });
  }

  mouseleaveListener() {
    fromEvent(this.el.nativeElement, 'mouseleave').pipe(
      tap(() => this.isTriggerHovered.set(false)),
      filter(() => this.isTooltipCreated()),
      debounceTime(this.debounce),
      filter(() => !this.isTooltipHovered())
    ).subscribe(() => {
      this.hide();
    });
  }

  show() {
    this.isTooltipCreated.set(true);
    this.showEnd.emit();
  }

  hide() {
    this.isTooltipCreated.set(false);
    this.hideEnd.emit();
  }

  setTooltipHovered($event: boolean) {
    if (!$event) {
      this.hide();
    }
    this.isTooltipHovered.set($event);
  }
}
