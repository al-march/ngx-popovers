import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent } from '../floating';
import { NGX_ARROW_COMPONENT } from './core/arrow.injections';
import { ArrowBase } from './core/arrow-base';
import { ComputePositionReturn, Placement } from '../type';
import { filter, map } from 'rxjs';

const staticSides: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

@Component({
  selector: 'ngx-arrow',
  standalone: true,
  imports: [CommonModule, ArrowBase],
  templateUrl: './arrow.html',
  styleUrl: './arrow.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Arrow implements AfterViewInit, OnChanges {
  arrowComponent = inject(NGX_ARROW_COMPONENT);
  floating = inject(FloatingComponent);

  @ViewChild('arrow')
  arrowRef?: ElementRef<HTMLElement>;

  @Input({ transform: numberAttribute })
  padding = 0;

  styles$ = this.floating.computePosition$.pipe(
    filter(Boolean),
    map(data => {
      return this.computePosition(data);
    })
  );

  ngOnChanges() {
    return this.updateState();
  }

  ngAfterViewInit() {
    return this.updateState();
  }

  async updateState() {
    await this.floating.setArrow(this);
  }

  computePosition({ middlewareData, placement }: ComputePositionReturn) {
    const arrowElement = this.arrowRef?.nativeElement;

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

  getSide(placement: Placement) {
    const side = placement.split('-')[0];
    return staticSides[side];
  }
}
