import { flip, MiddlewareList, offset, Placement, Strategy } from '../../type';

export interface FloatingConfig {
  placement: Placement;
  autoUpdate: boolean;
  bindTo?: HTMLElement | string;
  strategy?: Strategy;

  middleware: MiddlewareList;
}

export class NgxFloatingConfig implements FloatingConfig {
  placement: Placement = 'bottom';
  autoUpdate = true;
  bindTo?: HTMLElement | string;
  strategy?: Strategy;
  middleware: MiddlewareList = [
    offset(4),
    flip()
  ];

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
