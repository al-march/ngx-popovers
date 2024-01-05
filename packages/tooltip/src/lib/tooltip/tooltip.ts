import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  signal
} from '@angular/core';
import { FloatingArrowComponent, FloatingComponent, MiddlewareList, Placement } from '@ngx-popovers/core';
import { debounceTime, filter, fromEvent, Subscription, tap } from 'rxjs';
import { TooltipTemplate } from './template/tooltip-template.component';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [
    TooltipTemplate,
    FloatingComponent,
    CommonModule,
    FloatingArrowComponent
  ],
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
  cdRef = inject(ChangeDetectorRef);

  @Input('ngxTooltip')
  tooltipText = '';

  @Input()
  tooltipComponent = inject(NGX_TOOLTIP_COMPONENT);

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  middleware: MiddlewareList = this.config.middleware;

  private _ngxValue = false;

  @Input()
  set ngxValue(value: boolean) {
    this._ngxValue = value;
    if (value) {
      this.onShow();
    } else {
      this.onHide();
    }
  }

  get ngxValue() {
    return this._ngxValue;
  }

  @Output()
  ngxValueChange = new EventEmitter<boolean>();

  /**
   * Time delay before the tooltip is displayed
   */
  @Input({ transform: numberAttribute })
  debounce = this.config.debounce;

  /**
   * Show arrow or not
   */
  @Input({ transform: booleanAttribute })
  arrow = this.config.arrow;

  /**
   * Show arrow or not
   */
  @Input({ transform: numberAttribute })
  arrowPadding = this.config.arrowPadding;

  /**
   * Updates floating element automatically
   */
  @Input({ transform: booleanAttribute })
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

  get fixedDebounce() {
    return this.fixDebounce(this.debounce);
  }

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnChanges() {
    this.initListeners();
  }

  initListeners() {
    this.mouseMoveListener();
    this.mouseleaveListener();
    this.focusListener();
    this.blurListener();
  }

  private moveSubscriber$?: Subscription;

  mouseMoveListener() {
    this.moveSubscriber$?.unsubscribe();

    this.moveSubscriber$ = fromEvent(this.trigger, 'mousemove').pipe(
      tap(() => this.isTriggerHovered.set(true)),
      filter(() => !this.isTooltipCreated()),
      debounceTime(this.fixedDebounce),
      filter(() => this.isTriggerHovered())
    ).subscribe(() => {
      this.ngxValue = true;
      this.cdRef.detectChanges();
    });
  }

  private focusListener$?: Subscription;

  focusListener() {
    this.focusListener$?.unsubscribe();

    this.focusListener$ = fromEvent(this.trigger, 'focus').pipe(
      filter(() => !this.isTooltipCreated()),
      debounceTime(this.fixedDebounce)
    ).subscribe(() => {
      this.ngxValue = true;
    });
  }

  private leaveSubscriber$?: Subscription;

  mouseleaveListener() {
    this.leaveSubscriber$?.unsubscribe();

    this.leaveSubscriber$ = fromEvent(this.trigger, 'mouseleave').pipe(
      tap(() => this.isTriggerHovered.set(false)),
      filter(() => this.isTooltipCreated()),
      debounceTime(this.fixedDebounce),
      filter(() => !this.isTooltipHovered())
    ).subscribe(() => {
      this.ngxValue = false;
      this.cdRef.detectChanges();
    });
  }

  private blurListener$?: Subscription;

  blurListener() {
    this.blurListener$?.unsubscribe();

    this.blurListener$ = fromEvent(this.trigger, 'blur').pipe(
      filter(() => this.isTooltipCreated()),
      debounceTime(this.fixedDebounce)
    ).subscribe(() => {
      this.ngxValue = false;
    });
  }


  onShow() {
    if (this.isTooltipCreated()) {
      return;
    }

    this.show();
  }

  onHide() {
    if (!this.isTooltipCreated()) {
      return;
    }

    this.hide();
  }

  show() {
    this.isAnimating.set(true);
    this.isTooltipCreated.set(true);
    this.showEnd.emit();
    this.ngxValueChange.emit(true);
  }

  hide() {
    this.isAnimating.set(true);
    this.isTooltipCreated.set(false);
    this.hideEnd.emit();
    this.ngxValueChange.emit(false);
  }

  setTooltipHovered($event: boolean) {
    if (!$event) {
      this.hide();
    }
    this.isTooltipHovered.set($event);
  }

  private fixDebounce(time: unknown) {
    if (typeof time === 'number') {
      return time >= 0 ? time : 0;
    }
    return 0;
  }
}
