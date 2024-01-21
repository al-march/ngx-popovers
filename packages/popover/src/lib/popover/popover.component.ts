import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Arrow, FloatingComponent, MiddlewareList, Placement } from '@ngx-popovers/core';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { ComputePosition, NGX_POPOVER_CONFIG } from '@ngx-popovers/popover';
import { PopoverTemplate } from '../directives/popover-template.directive';

@Component({
  selector: 'ngx-popover',
  standalone: true,
  imports: [CommonModule, Arrow, FloatingComponent],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(140, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(110, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PopoverComponent implements OnChanges {
  private config = inject(NGX_POPOVER_CONFIG);
  private cdRef = inject(ChangeDetectorRef);
  private el = inject(ElementRef);

  @ContentChild(PopoverTemplate)
  template?: PopoverTemplate;

  @ContentChild(Arrow)
  arrow?: Arrow;

  /* Set the Floating to the arrow */
  @ViewChild(FloatingComponent)
  set floatingComponent(component: FloatingComponent) {
    if (this.arrow) {
      this.arrow.setFloating(component);
    }
  }

  @Input()
  anchor: HTMLElement = this.el.nativeElement;

  @Input()
  placement: Placement = this.config.placement;

  @Input()
  middleware: MiddlewareList = this.config.middleware;

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
  value = false;

  @Output()
  valueChange = new EventEmitter<boolean>();

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

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes['value']?.currentValue;

    if (currentValue === true) {
      this.open();
    }
    if (currentValue === false) {
      this.close();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (isElement(event.target)) {
      if (this.anchor.contains(event.target)) {
        this.toggle();
      }
    }
  }

  toggle() {
    if (!this.disabled) {
      if (this.value) {
        this.close();
      } else {
        this.open();
      }
    }
  }

  open() {
    this.isAnimating.set(true);
    this.value = true;
    this.valueChange.emit(true);
    this.show.emit();
  }

  close() {
    if (this.isAnimating()) {
      return;
    }
    this.isAnimating.set(true);
    this.value = false;
    this.valueChange.emit(false);
    this.hide.emit();
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

function isElement(element: unknown): element is Element {
  return element instanceof Element;
}
