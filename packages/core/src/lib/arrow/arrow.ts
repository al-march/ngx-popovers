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
import { FloatingComponent } from '../floating/floating.component';
import { NGX_ARROW_COMPONENT } from './core/arrow.injections';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ngx-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow.html',
  styleUrl: './arrow.scss',
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
    this.floating.setArrow(this);
  }

  ngAfterViewInit() {
    this.floating.setArrow(this);
  }
}
