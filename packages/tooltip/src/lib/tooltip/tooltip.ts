import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal
} from '@angular/core';
import {
  Derivable,
  FlipOptions,
  FloatingArrowComponent,
  FloatingComponent,
  OffsetOptions,
  Placement,
  ShiftOptions
} from '@ngx-popovers/core';
import { debounceTime, filter, fromEvent, Subscription, tap } from 'rxjs';
import { TooltipTemplate } from './template/tooltip-template.component';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [TooltipTemplate, FloatingComponent, CommonModule, FloatingArrowComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(140, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NgxTooltip implements OnChanges {
  config = inject(NGX_TOOLTIP_CONFIG);
  @Input('ngxTooltip')
  tooltipText = '';

  @Input()
  tooltipComponent = inject(NGX_TOOLTIP_COMPONENT);

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

  /**
   * Show arrow or not
   */
  @Input()
  arrowPadding = this.config.arrowPadding;

  /**
   * Updates floating element automatically
   */
  @Input()
  autoUpdate = this.config.autoUpdate;

  /**
   * HTMLElement where floating renders
   */
  @Input()
  bindTo = this.config.bindTo;

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
  isAnimating = signal(false);

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnChanges() {
    this.mouseMoveListener();
    this.mouseleaveListener();
  }

  private moveSubscriber$?: Subscription;

  mouseMoveListener() {
    this.moveSubscriber$?.unsubscribe();

    const debounce = this.fixDebounce(this.debounce);
    this.moveSubscriber$ = fromEvent(this.trigger, 'mousemove').pipe(
      tap(() => this.isTriggerHovered.set(true)),
      filter(() => !this.isTooltipCreated()),
      debounceTime(debounce),
      filter(() => this.isTriggerHovered())
    ).subscribe(() => {
      this.onMouseMove();
    });
  }

  onMouseMove() {
    if (this.isTooltipCreated()) {
      return;
    }

    this.show();
  }

  private leaveSubscriber$?: Subscription;

  mouseleaveListener() {
    this.leaveSubscriber$?.unsubscribe();

    const debounce = this.fixDebounce(this.debounce);
    this.leaveSubscriber$ = fromEvent(this.trigger, 'mouseleave').pipe(
      tap(() => this.isTriggerHovered.set(false)),
      filter(() => this.isTooltipCreated()),
      debounceTime(debounce),
      filter(() => !this.isTooltipHovered())
    ).subscribe(() => {
      this.onMouseLeave();
    });
  }

  onMouseLeave() {
    this.hide();
  }

  show() {
    this.isAnimating.set(true);
    this.isTooltipCreated.set(true);
    this.showEnd.emit();
  }

  hide() {
    this.isAnimating.set(true);
    this.isTooltipCreated.set(false);
    this.hideEnd.emit();
  }

  setTooltipHovered($event: boolean) {
    if (!$event) {
      this.hide();
    }
    this.isTooltipHovered.set($event);
  }

  /**
   * Minimum time of debounce time
   */
  private debounceMinTime = 20;

  private fixDebounce(time: unknown) {
    if (typeof time === 'number') {
      if (time >= this.debounceMinTime) {
        return time;
      } else {
        return this.debounceMinTime;
      }
    }
    return this.debounceMinTime;
  }
}
