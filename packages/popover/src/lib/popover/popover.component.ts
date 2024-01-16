import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, FloatingComponent, MiddlewareList, Placement } from '@ngx-popovers/core';
import { NGX_POPOVER_CONFIG } from '../core/popover.injections';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { ComputePosition } from '../types';

@Component({
  selector: '[ngxPopover]',
  exportAs: 'ngxPopover',
  standalone: true,
  imports: [CommonModule, FloatingComponent, Arrow],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
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
export class PopoverComponent implements OnChanges {
  private config = inject(NGX_POPOVER_CONFIG);
  private cdRef = inject(ChangeDetectorRef);

  @Input('ngxPopover')
  template?: TemplateRef<any>;

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  middleware: MiddlewareList = this.config.middleware;

  @Input({ transform: booleanAttribute })
  arrow = this.config.arrow;

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
   * If true then the popover will close after a user
   * clicks outside the floating element
   */
  @Input({ transform: booleanAttribute })
  closeOnClickedOutside = this.config.closeOnClickedOutside;

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input({ transform: booleanAttribute })
  animationDisabled = false;

  @Input({ transform: booleanAttribute })
  ngxValue = false;

  @Output()
  ngxValueChange = new EventEmitter();

  @Output()
  show = new EventEmitter();

  @Output()
  hide = new EventEmitter();

  @Output()
  clickedOutside = new EventEmitter<Element>();

  @Output()
  clickedInside = new EventEmitter<Element>();

  @Output()
  animationStart = new EventEmitter<AnimationEvent>();

  @Output()
  animationDone = new EventEmitter<AnimationEvent>();

  @Output()
  computePosition = new EventEmitter<ComputePosition>();

  isAnimating = signal(false);

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes['ngxValue']?.currentValue;

    if (currentValue === true) {
      this.open();
    }
    if (currentValue === false) {
      this.close();
    }
  }

  @HostListener('click', ['$event'])
  onClick() {
    if (!this.disabled) {
      if (this.ngxValue) {
        this.close();
        this.hide.emit();
      } else {
        this.open();
        this.show.emit();
      }
    }
  }

  open() {
    this.isAnimating.set(true);
    this.ngxValue = true;
    this.ngxValueChange.emit(true);
  }

  close() {
    this.isAnimating.set(true);
    this.ngxValue = false;
    this.ngxValueChange.emit(false);
  }

  onClickedInside(element: Element) {
    this.clickedInside.emit(element);
  }

  onClickedOutside(element: Element) {
    this.clickedOutside.emit(element);
    /* Close the popover when user clicks outside */
    if (this.closeOnClickedOutside) {
      this.close();
      this.cdRef.detectChanges();
    }
  }

  onAnimationStart($event: AnimationEvent) {
    this.isAnimating.set(true);
    this.animationStart.emit($event);
  }

  onAnimationDone($event: AnimationEvent) {
    this.isAnimating.set(false);
    this.animationDone.emit($event);
  }

  onComputePosition($event: ComputePosition) {
    this.computePosition.emit($event);
  }
}
