import { animate, state, style, transition, trigger } from '@angular/animations';

export enum AnimationState {
  OPEN = 'open',
  CLOSE = 'close',
}

export const openClose = trigger('openClose', [
  state(
    AnimationState.OPEN,
    style({
      opacity: 1
    })
  ),
  state(
    AnimationState.CLOSE,
    style({
      opacity: 0
    })
  ),
  transition(`${AnimationState.CLOSE} => ${AnimationState.OPEN}`, [
    animate('0.15s')
  ]),
  transition(`${AnimationState.OPEN} => ${AnimationState.CLOSE}`, [
    animate('0.10s')
  ])
]);
