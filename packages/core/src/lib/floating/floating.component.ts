import {
  AfterViewInit,
  booleanAttribute,
  Component,
  computed,
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
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, shareReplay } from 'rxjs';
import { arrow, ComputePositionReturn, FloatingElement, ReferenceElement } from '../type';
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
  readonly config = inject(NGX_FLOATING_CONFIG);
  readonly floatingService = inject(FloatingService);
  readonly isServer = isServer();

  floatingRef = viewChild<ElementRef<HTMLElement>>('floating');

  /**
   * TODO: remove after v.18
   * @deprecated
   */
  trigger = input<HTMLElement>();
  reference = input<ReferenceElement>();

  /**
   * TODO: remove and use reference after v.18
   */
  _reference = computed(() => this.reference() || this.trigger());

  placement = input(this.config.placement);
  strategy = input(this.config.strategy);
  autoUpdate = input(this.config.autoUpdate, { transform: booleanAttribute });
  arrow = model<Arrow>();
  middleware = input(this.config.middleware);
  bindTo = input(this.config.bindTo);

  clickedOutside = output<Element>();
  clickedInside = output<Element>();
  computePositionReturn = output<ComputePositionReturn>();

  readonly arrowMiddleware = computed(() => this.getArrowMiddleware(this.arrow()));

  private _computePosition$ = new BehaviorSubject<ComputePositionReturn | undefined>(undefined);
  computePosition$ = this._computePosition$
    .asObservable()
    .pipe(shareReplay());

  readonly coords = toSignal(this.computePosition$.pipe(
    filter(Boolean),
    map(({ x, y }) => ({ x, y }))
  ));

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
    const reference = this._reference();
    const floating = this.floatingRef()?.nativeElement;

    if (reference && floating) {
      if (this.autoUpdate()) {
        this.cleanup = this.floatingService.autoUpdate(reference, floating, async () => {
          await this.computePosition(reference, floating);
        });
      } else {
        this.cleanup = undefined;
        await this.computePosition(reference, floating);
      }
    }

    return;
  }

  async computePosition(reference: ReferenceElement, floating: FloatingElement) {
    const computePositionReturn = await this.floatingService.computePosition(reference, floating, {
      placement: this.placement(),
      strategy: this.strategy(),
      middleware: [...this.middleware(), this.arrowMiddleware()]
    });

    this._computePosition$.next(computePositionReturn);
    this.computePositionReturn.emit(computePositionReturn);
  }

  /* Check if user clicked outside the floating element*/
  onClickOutside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the reference element */
      if (target !== this._reference()) {
        this.clickedOutside.emit(target);
      }
    }
  }

  /* Check if user clicked inside the floating element*/
  onClickInside(target: EventTarget) {
    if (target instanceof Element) {
      /* Ignore the reference element */
      if (target !== this._reference()) {
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

  private getArrowMiddleware(arr?: Arrow) {
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
