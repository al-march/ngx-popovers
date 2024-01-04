import { MiddlewareList, offset, Placement } from '../../type';
import { flip } from '@floating-ui/dom';

export interface FloatingConfig {
  placement: Placement;
  autoUpdate: boolean;
  middleware: MiddlewareList;
  bindTo?: HTMLElement | string;
}

export class NgxFloatingConfig implements FloatingConfig {
  placement: Placement = 'bottom';
  autoUpdate = true;
  bindTo?: HTMLElement | string;
  middleware: MiddlewareList = [
    offset(4),
    flip(),
  ];

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
