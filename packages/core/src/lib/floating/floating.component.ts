import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { arrow, ComputePositionReturn, Middleware, Placement } from '../type';
import { PortalComponent } from '../portal';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';
import { FloatingService } from '../floating.service';
import { Arrow } from '../arrow';
import { ClickOutsideDirective } from '../click-outside';
import { BehaviorSubject, filter, map, shareReplay } from 'rxjs';
import { PlatformService } from '../platform.service';


@Component({
  selector: 'ngx-floating',
  standalone: true,
  imports: [
    CommonModule,
    PortalComponent,
    ClickOutsideDirective
  ],
  providers: [
    FloatingService,
    PlatformService
  ],
  templateUrl: './floating.component.html',
  styleUrl: './floating.component.scss'
})
export class FloatingComponent implements AfterViewInit, OnChanges, OnDestroy {
  config = inject(NGX_FLOATING_CONFIG);
  floatingService = inject(FloatingService);

  isServer = inject(PlatformService).isServer();

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
  arrow?: Arrow;

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

  private _computePosition$ = new BehaviorSubject<ComputePositionReturn | undefined>(undefined);
  public computePosition$ = this._computePosition$.asObservable();

  coords$ = this.computePosition$.pipe(
    filter(Boolean),
    map(({ x, y }) => ({ x, y })),
    shareReplay()
  );

  /* Uses for cleanup autoUpdate function */
  cleanup?: () => void;

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
    return this.bind();
  }

  ngOnChanges() {
    return this.bind();
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
    return;
  }

  async computePosition(trigger: HTMLElement, floating: HTMLElement) {
    const computePositionReturn = await this.floatingService.computePosition(trigger, floating, {
      placement: this.placement,
      middleware: [...this.middleware, this.arrowMiddleware]
    });

    this._computePosition$.next(computePositionReturn);
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

  /**
   * Arrow sets from <ngx-arrow/> component
   */
  setArrow(arrow: Arrow) {
    this.arrow = arrow;
    return this.bind();
  }
}
