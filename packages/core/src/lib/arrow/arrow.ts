import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  OnChanges,
  OnDestroy,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent } from '../floating';
import { NGX_ARROW_COMPONENT } from './core/arrow.injections';
import { ComputePositionReturn, Placement } from '../type';
import { filter, map, Observable, of, Subscription } from 'rxjs';

type ArrowStyles = Record<string, string>;

const staticSides: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

@Component({
  selector: 'ngx-arrow',
  imports: [CommonModule],
  templateUrl: './arrow.html',
  styleUrl: './arrow.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Arrow implements OnChanges, AfterViewInit, OnDestroy {
  arrowComponent = inject(NGX_ARROW_COMPONENT);
  cdRef = inject(ChangeDetectorRef);

  arrowRef = viewChild<ElementRef<HTMLElement>>('arrow');
  floating = model(inject(FloatingComponent, { optional: true }));
  padding = input(0, { transform: numberAttribute });

  styles: ArrowStyles = {};

  private subscription?: Subscription;

  async ngOnChanges() {
    await this.updateState();
  }

  async ngAfterViewInit() {
    await this.updateState();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async updateState() {
    const floating = this.floating();
    if (floating) {
      await floating.setArrow(this);
    }
    this.observe();
  }

  /*
  * Observe changes from computePosition of the floating.
  * Convert the ComputePosition data to the Arrow's styles
  */
  private observe() {
    this.subscription?.unsubscribe();
    this.subscription = this.computeStyles$()
      .subscribe(styles => {
        this.styles = styles;
        this.cdRef.markForCheck();
      });
  }

  private computeStyles$(): Observable<ArrowStyles> {
    return this.floating()?.computePosition$
      .pipe(
        filter(Boolean),
        map(data => {
          return this.computePosition(data);
        })
      ) ?? of({});
  }

  getSide(placement: Placement) {
    const side = placement.split('-')[0];
    return staticSides[side];
  }

  /**
   * Set the floating element programmatically.
   * Need for setting the Floating if DI is not allowed.
   */
  setFloating(floating: FloatingComponent) {
    this.floating.set(floating);
    this.cdRef.detectChanges();
    return this.updateState();
  }

  /**
   * computePosition converts data from ComputePositionReturn
   * to Arrow's styles object Record<string, string>
   */
  private computePosition({ middlewareData, placement }: ComputePositionReturn): ArrowStyles {
    const arrowElement = this.arrowRef()?.nativeElement;

    if (middlewareData.arrow && arrowElement) {
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
        styles[staticSide] = `${-arrowElement.offsetWidth / 2}px`;
      }

      return styles;
    }
    return {};
  }
}
