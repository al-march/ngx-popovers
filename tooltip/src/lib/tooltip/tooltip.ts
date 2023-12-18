import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { computePosition, flip, offset, Placement } from '@floating-ui/dom';

@Component({
  selector: '[ngxTooltip]',
  standalone: true,
  imports: [PortalComponent, Template],
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

  coords = signal({
    left: 0,
    top: 0
  });

  constructor(private el: ElementRef, private ref: ChangeDetectorRef) {}

  @HostListener('mousemove')
  async onMousemove() {
    if (this.isTooltipCreated()) {
      return;
    }

    this.show();
    this.showTooltip();
    // Changes need to be detected to help Angular find the tooltipRef
    this.ref.detectChanges();
    await this.setCoords();
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

  async setCoords() {
    const { x, y } = await this.getCoords();
    this.coords.set({ left: x, top: y });
  }

  private async getCoords() {
    const trigger = this.el.nativeElement;
    const tooltip = this.tooltipRef?.nativeElement;

    if (trigger && tooltip) {
      const { x, y } = await computePosition(trigger, tooltip, {
        placement: this.placement,
        middleware: [flip(), offset(6)]
      });
      return { x, y };
    } else {
      return { x: 0, y: 0 };
    }
  }
}
