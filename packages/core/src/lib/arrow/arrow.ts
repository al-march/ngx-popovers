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
import { FloatingComponent } from '../floating/floating.component';
import { NGX_ARROW_COMPONENT } from './core/arrow.injections';
import { toObservable } from '@angular/core/rxjs-interop';
import { ArrowBase } from './core/arrow-base';

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

  arrowStyles$ = toObservable(this.floating.arrowStyles);

  ngOnChanges() {
    this.updateState();
  }

  ngAfterViewInit() {
    this.updateState();
  }

  async updateState() {
    await this.floating.setArrow(this);
  }
}
