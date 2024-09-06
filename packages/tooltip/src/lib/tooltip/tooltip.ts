import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  signal,
  TemplateRef
} from '@angular/core';
import { Arrow, FloatingComponent, MiddlewareList, Placement, PlatformService } from '@ngx-popovers/core';
import { debounceTime, filter, fromEvent, Subscription, tap } from 'rxjs';
import { TooltipTemplate } from './template/tooltip-template.component';
import { NGX_TOOLTIP_COMPONENT, NGX_TOOLTIP_CONFIG } from './core/tooltip.injections';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ComputePosition } from './types';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [
    TooltipTemplate,
    FloatingComponent,
    CommonModule,
    Arrow
  ],
  providers: [PlatformService],
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
  template?: TemplateRef<void>;

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  middleware: MiddlewareList = this.config.middleware;

  strategy = input(this.config.strategy);

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

  @Input({ transform: booleanAttribute })
  tooltipDisabled = false;

  @Input({ transform: booleanAttribute })
  animationDisabled = false;

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

  @Output()
  animationStart = new EventEmitter<AnimationEvent>();

  @Output()
  animationDone = new EventEmitter<AnimationEvent>();

  @Output()
  clickedOutside = new EventEmitter<Element>();

  @Output()
  clickedInside = new EventEmitter<Element>();

  @Output()
  computePosition = new EventEmitter<ComputePosition>();

  isTooltipCreated = signal(false);
  isReferenceHovered = signal(false);
  isTooltipHovered = signal(false);
  isAnimating = signal(false);

  get reference() {
    return this.el.nativeElement as HTMLElement;
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

    this.moveSubscriber$ = fromEvent(this.reference, 'mousemove').pipe(
      filter(() => !this.tooltipDisabled),
      tap(() => this.isReferenceHovered.set(true)),
      filter(() => !this.isTooltipCreated()),
      debounceTime(this.fixedDebounce),
      filter(() => this.isReferenceHovered())
    ).subscribe(() => {
      this.ngxValue = true;
      this.cdRef.detectChanges();
    });
  }

  private focusListener$?: Subscription;

  focusListener() {
    this.focusListener$?.unsubscribe();

    this.focusListener$ = fromEvent(this.reference, 'focus').pipe(
      filter(() => !this.tooltipDisabled),
      filter(() => !this.isTooltipCreated()),
      debounceTime(this.fixedDebounce)
    ).subscribe(() => {
      this.ngxValue = true;
    });
  }

  private leaveSubscriber$?: Subscription;

  mouseleaveListener() {
    this.leaveSubscriber$?.unsubscribe();

    this.leaveSubscriber$ = fromEvent(this.reference, 'mouseleave').pipe(
      filter(() => !this.tooltipDisabled),
      tap(() => this.isReferenceHovered.set(false)),
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

    this.blurListener$ = fromEvent(this.reference, 'blur').pipe(
      filter(() => !this.tooltipDisabled),
      filter(() => this.isTooltipCreated()),
      debounceTime(this.fixedDebounce),
      filter(() => !this.isTooltipHovered())
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

  onClickedInside(element: Element) {
    this.clickedInside.emit(element);
  }

  /**
   * Check if user clicked outside the reference and the tooltip element.
   * Close tooltip if user clicks outside (actually for touch devices)
   */
  onClickedOutside(element: Element) {
    if (element !== this.reference) {
      this.ngxValue = false;
    }

    this.clickedOutside.emit(element);
  }

  onAnimationStart(event: AnimationEvent) {
    this.isAnimating.set(true);
    this.animationStart.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.isAnimating.set(false);
    this.animationDone.emit(event);
  }

  onPositionReturn($event: ComputePosition) {
    this.computePosition.emit($event);
  }

  private fixDebounce(time: unknown) {
    if (typeof time === 'number') {
      return time >= 0 ? time : 0;
    }
    return 0;
  }
}
