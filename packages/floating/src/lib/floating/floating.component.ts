import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Derivable,
  flip,
  FlipOptions,
  FloatingService,
  offset,
  OffsetOptions,
  Placement,
  shift,
  ShiftOptions
} from '@ngx-popovers/core';
import { PortalComponent } from '@ngx-popovers/portal';
import { arrow } from '@floating-ui/dom';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';

const staticSides: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

@Component({
  selector: 'ngx-floating',
  standalone: true,
  imports: [
    CommonModule,
    PortalComponent
  ],
  providers: [
    FloatingService
  ],
  templateUrl: './floating.component.html',
  styleUrl: './floating.component.scss'
})
export class FloatingComponent implements AfterViewInit, OnChanges {
  config = inject(NGX_FLOATING_CONFIG);
  floatingService = inject(FloatingService);

  @ViewChild('floating')
  floatingRef?: ElementRef<HTMLElement>;

  @Input()
  trigger?: HTMLElement;

  @Input()
  placement = this.config.placement;

  @Input()
  flip?: FlipOptions | Derivable<FlipOptions> = this.config.flip;

  @Input()
  shift?: ShiftOptions | Derivable<ShiftOptions> = this.config.shift;

  @Input()
  offset?: OffsetOptions = this.config.offset;

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

  coords = signal({ x: 0, y: 0 });
  arrowStyles = signal<Record<string, string>>({});

  // Uses for cleanup autoUpdate function
  cleanup?: () => void;

  private _arrow?: HTMLElement;

  get arrowEl() {
    return this._arrow;
  }

  async ngAfterViewInit() {
    await this.bind();
  }

  async ngOnChanges() {
    await this.bind();
  }

  async bind() {
    this.cleanup?.();
    const trigger = this.trigger;
    const floating = this.floatingRef?.nativeElement;

    if (trigger && floating) {
      if (this.autoUpdate) {
        this.cleanup = this.floatingService.autoUpdate(trigger, floating, async () => {
          await this.computePosition(trigger, floating);
        });
      } else {
        await this.computePosition(trigger, floating);
      }
    }
  }

  async computePosition(trigger: HTMLElement, floating: HTMLElement) {
    const { x, y, middlewareData, placement } = await this.floatingService.computePosition(trigger, floating, {
      placement: this.placement,
      middleware: [
        offset(this.offset),
        flip(this.flip),
        shift(this.shift),
        arrow({
          element: this.arrowEl!,
          padding: this.arrowPadding
        })
      ]
    });

    if (middlewareData.arrow && this.arrowEl) {
      const { x, y } = middlewareData.arrow;

      const staticSide = this.getSide(placement);
      const styles: Record<string, string> = {};
      if (x != null) {
        styles['left'] = `${x}px`;
      }
      if (y != null) {
        styles['top'] = `${y}px`;
      }
      if (staticSide) {
        styles[staticSide] = `${-this.arrowEl!.offsetWidth / 2}px`;
      }

      this.arrowStyles.set(styles);
    }

    this.coords.set({ x, y });
  }

  getSide(placement: Placement) {
    const side = placement.split('-')[0];
    return staticSides[side];
  }

  /**
   * Arrow sets from <floating-arrow> component
   */
  setArrow(arrow: HTMLElement) {
    this._arrow = arrow;
  }
}
