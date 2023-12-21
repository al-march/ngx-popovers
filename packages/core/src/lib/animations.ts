import { animate, state, style, transition, trigger } from '@angular/animations';

export enum OpenCloseState {
  OPEN = 'open',
  CLOSE = 'close',
}

export const openClose = trigger('openClose', [
  state(
    OpenCloseState.OPEN,
    style({
      opacity: 1
    })
  ),
  state(
    OpenCloseState.CLOSE,
    style({
      opacity: 0
    })
  ),
  transition(`${OpenCloseState.CLOSE} => ${OpenCloseState.OPEN}`, [
    animate('0.15s')
  ]),
  transition(`${OpenCloseState.OPEN} => ${OpenCloseState.CLOSE}`, [
    animate('0.10s')
  ])
]);
