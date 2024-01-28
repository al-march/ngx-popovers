import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(10px) scale(0.98)', opacity: 0 }),
        animate(120, style({
          transform: 'translateY(0) scale(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(80, style({
          transform: 'translateY(4px) scale(0.99)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class DialogComponent implements AfterViewInit {

  @Input()
  value = false;

  @Input()
  animationDisabled = false;

  @Output()
  valueChange = new EventEmitter<boolean>();

  @Output()
  animationStart = new EventEmitter<AnimationEvent>();

  @Output()
  animationDone = new EventEmitter<AnimationEvent>();

  isAnimating = signal(false);

  ngAfterViewInit() {
  }

  open() {
    this.onValueChanged(true);
  }

  close() {
    this.onValueChanged(false);
  }

  onValueChanged(value: boolean) {
    this.isAnimating.set(true);
    this.value = value;
    this.valueChange.emit(value);
  }

  onAnimationStart(event: AnimationEvent) {
    this.isAnimating.set(true);
    this.animationStart.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.isAnimating.set(false);
    this.animationDone.emit(event);
  }
}
