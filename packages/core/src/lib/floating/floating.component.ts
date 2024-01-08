import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { arrow, Middleware, Placement } from '../type';
import { PortalComponent } from '../portal';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';
import { FloatingService } from '../floating.service';
import { FloatingArrowComponent } from './floating-arrow/floating-arrow.component';
import { ClickOutsideDirective } from '../click-outside';

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
    PortalComponent,
    ClickOutsideDirective
  ],
  providers: [
    FloatingService
  ],
  templateUrl: './floating.component.html',
  styleUrl: './floating.component.scss'
})
export class FloatingComponent implements AfterViewInit, OnChanges, OnDestroy {
  config = inject(NGX_FLOATING_CONFIG);
  floatingService = inject(FloatingService);
  cdRef = inject(ChangeDetectorRef);

  platformId = inject(PLATFORM_ID);
  // Do not run floating-ui inside Window.
  // We need to render dynamic content only when the Window is allowed
  isServer = isPlatformServer(this.platformId);

  @ViewChild('floating')
  floatingRef?: ElementRef<HTMLElement>;

  @Input({ required: true })
  trigger?: HTMLElement;

  @Input()
  placement: Placement = this.config.placement;

  /**
   * Updates floating element automatically
   */
  @Input({ transform: booleanAttribute })
  autoUpdate = this.config.autoUpdate;

  /**
   * Arrow component for arrow middleware.
   * It sets by <ngx-floating-arrow />
   */
  @Input()
  arrow?: FloatingArrowComponent;

  /**
   * List of floating-ui middleware
   */
  @Input()
  middleware: Array<Middleware | null | undefined | false> = this.config.middleware;

  /**
   * HTMLElement where floating renders
   */
  @Input()
  bindTo = this.config.bindTo;

  /**
   * Emits when user clicks outside the floating element
   */
  @Output()
  clickedOutside = new EventEmitter<Element>();

  /**
   * Emits when user clicks inside the floating element
   */
  @Output()
  clickedInside = new EventEmitter<Element>();

  coords = { x: 0, y: 0 };
  arrowStyles = signal<Record<string, string>>({});

  // Uses for cleanup autoUpdate function
  cleanup?: () => void;

  get arrowEl() {
    return this.arrow?.arrowRef?.nativeElement;
  }

  get arrowMiddleware() {
    if (this.arrow?.arrowRef) {
      return arrow({
        element: this.arrow.arrowRef!.nativeElement,
        padding: this.arrow.padding
      });
    }
    return null;
  }

  ngAfterViewInit() {
    this.bind();
  }

  ngOnChanges() {
    this.bind();
  }

  ngOnDestroy() {
    this.cleanup?.();
  }

  async bind() {
    if (this.isServer) {
      return;
    }
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
      middleware: [...this.middleware, this.arrowMiddleware]
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
      this.cdRef.detectChanges();
    }

    this.coords = { x, y };
    this.cdRef.detectChanges();
  }

  /* Check if user clicked outside the floating element*/
  onClickOutside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the trigger element */
      if (target !== this.trigger) {
        this.clickedOutside.emit(target);
      }
    }
  }

  /* Check if user clicked inside the floating element*/
  onClickInside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the trigger element */
      if (target !== this.trigger) {
        this.clickedInside.emit(target);
      }
    }
  }

  getSide(placement: Placement) {
    const side = placement.split('-')[0];
    return staticSides[side];
  }

  /**
   * Arrow sets from <floating-arrow> component
   */
  setArrow(arrow: FloatingArrowComponent) {
    this.arrow = arrow;
    return this.bind();
  }
}
