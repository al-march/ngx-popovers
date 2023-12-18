import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PortalComponent } from '@ngx-popovers/core';

enum AnimationState {
  OPEN = 'open',
  CLOSE = 'close',
}

@Component({
  selector: 'ngx-tooltip-template',
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './template.html',
  styleUrl: './template.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        AnimationState.OPEN,
        style({
          opacity: 1,
        })
      ),
      state(
        AnimationState.CLOSE,
        style({
          opacity: 0,
        })
      ),
      transition(`${AnimationState.CLOSE} => ${AnimationState.OPEN}`, [
        animate('0.15s'),
      ]),
      transition(`${AnimationState.OPEN} => ${AnimationState.CLOSE}`, [
        animate('0.15s'),
      ]),
    ]),
  ],
  host: {
    '[class.closing]': '!isOpen',
  },
})
export class Template implements OnInit, AfterViewInit, OnChanges {
  @Input()
  text = '';

  @Input()
  isOpen = false;

  @Output()
  showAnimationEnd = new EventEmitter();

  @Output()
  hideAnimationEnd = new EventEmitter();

  animation = signal<AnimationState>(AnimationState.CLOSE);

  ngOnInit() {
    this.animation.set(AnimationState.CLOSE);
  }

  ngAfterViewInit() {
    this.animation.set(AnimationState.OPEN);
  }

  ngOnChanges() {
    const animation = this.isOpen ? AnimationState.OPEN : AnimationState.CLOSE;
    this.animation.set(animation);
  }

  onAnimationEmit($event: AnimationEvent) {
    switch ($event.toState) {
      case AnimationState.OPEN:
        this.showAnimationEnd.emit();
        break;
      case AnimationState.CLOSE:
        this.hideAnimationEnd.emit();
        break;
    }
  }
}
