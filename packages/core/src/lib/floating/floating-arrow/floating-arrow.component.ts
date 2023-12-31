import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent } from '../floating.component';
import { NGX_FLOATING_ARROW_COMPONENT } from '../core/floating.injections';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ngx-floating-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-arrow.component.html',
  styleUrl: './floating-arrow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingArrowComponent implements AfterViewInit, OnChanges {
  arrowComponent = inject(NGX_FLOATING_ARROW_COMPONENT);
  floating = inject(FloatingComponent);

  @ViewChild('arrow')
  arrowRef?: ElementRef<HTMLElement>;

  @Input({ transform: numberAttribute })
  padding = 0;

  arrowStyles$ = toObservable(this.floating.arrowStyles);

  ngOnChanges() {
    this.floating.setArrow(this);
  }

  ngAfterViewInit() {
    this.floating.setArrow(this);
  }
}
