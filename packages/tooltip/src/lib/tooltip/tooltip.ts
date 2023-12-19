import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import { PortalComponent } from '@ngx-popovers/core';
import { Template } from './template/template';
import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@floating-ui/dom';
import { FloatingComponent } from '@ngx-popovers/floating';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [PortalComponent, Template, FloatingComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTooltip {
  @ViewChild('tooltipRef')
  tooltipRef?: ElementRef<HTMLElement>;

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

  get trigger() {
    return this.el.nativeElement;
  }

  constructor(private el: ElementRef) {}

  @HostListener('mousemove')
  async onMousemove() {
    if (this.isTooltipCreated()) {
      return;
    }

    this.show();
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseleave() {
    if (!this.isTooltipCreated()) {
      return;
    }
    this.hideTooltip();
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
}
