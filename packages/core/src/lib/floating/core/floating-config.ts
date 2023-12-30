import { MiddlewareList, offset, Placement } from '../../type';

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
    offset(4)
  ];

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
