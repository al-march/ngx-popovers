import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  model,
  OnChanges,
  OnDestroy,
  output,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, filter, map, shareReplay } from 'rxjs';
import { arrow, ComputePositionReturn } from '../type';
import { PortalComponent } from '../portal';
import { NGX_FLOATING_CONFIG } from './core/floating.injections';
import { FloatingService } from '../floating.service';
import { Arrow } from '../arrow';
import { ClickOutsideDirective } from '../click-outside';
import { PlatformService } from '../platform.service';
import { isServer } from '../injections';


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
  cdRef = inject(ChangeDetectorRef);
  isServer = isServer();

  floatingRef = viewChild<ElementRef<HTMLElement>>('floating');

  trigger = input.required<HTMLElement>();
  placement = input(this.config.placement);

  /**
   * Updates floating element automatically
   */
  autoUpdate = input(this.config.autoUpdate, { transform: booleanAttribute });

  /**
   * Arrow component for arrow middleware.
   * It sets by <ngx-floating-arrow />
   */
  arrow = model<Arrow>();

  /**
   * List of floating-ui middleware
   */
  middleware = input(this.config.middleware);

  /**
   * HTMLElement where floating renders
   */
  bindTo = input(this.config.bindTo);

  /**
   * Emits when user clicks outside the floating element
   */
  clickedOutside = output<Element>();

  /**
   * Emits when user clicks inside the floating element
   */
  clickedInside = output<Element>();

  computePositionReturn = output<ComputePositionReturn>();

  private _computePosition$ = new BehaviorSubject<ComputePositionReturn | undefined>(undefined);
  public computePosition$ = this._computePosition$
    .asObservable()
    .pipe(shareReplay());

  coords$ = this.computePosition$.pipe(
    filter(Boolean),
    map(({ x, y }) => ({ x, y }))
  );

  /* Uses for cleanup autoUpdate function */
  cleanup?: () => void;

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
    const trigger = this.trigger();
    const floating = this.floatingRef()?.nativeElement;

    if (trigger && floating) {
      if (this.autoUpdate()) {
        this.cleanup = this.floatingService.autoUpdate(trigger, floating, async () => {
          await this.computePosition(trigger, floating);
        });
      } else {
        this.cleanup = undefined;
        await this.computePosition(trigger, floating);
      }
    }

    return;
  }


  async computePosition(trigger: HTMLElement, floating: HTMLElement) {
    const computePositionReturn = await this.floatingService.computePosition(trigger, floating, {
      placement: this.placement(),
      middleware: [...this.middleware(), this.getArrowMiddleware()]
    });

    this._computePosition$.next(computePositionReturn);
    this.computePositionReturn.emit(computePositionReturn);
    this.cdRef.detectChanges();
  }

  /* Check if user clicked outside the floating element*/
  onClickOutside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the trigger element */
      if (target !== this.trigger()) {
        this.clickedOutside.emit(target);
      }
    }
  }

  /* Check if user clicked inside the floating element*/
  onClickInside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the trigger element */
      if (target !== this.trigger()) {
        this.clickedInside.emit(target);
      }
    }
  }

  /**
   * Arrow sets from <ngx-arrow/> component
   */
  setArrow(arrow: Arrow) {
    this.arrow.set(arrow);
    return this.bind();
  }

  getArrowMiddleware() {
    const arr = this.arrow();
    const arrRef = arr?.arrowRef();
    if (arr && arrRef) {
      return arrow({
        element: arrRef.nativeElement,
        padding: arr.padding()
      });
    }
    return null;
  }
}
