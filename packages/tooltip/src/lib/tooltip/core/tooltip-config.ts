import { flip, FloatingConfig, MiddlewareList, NgxFloatingConfig, offset } from '@ngx-popovers/core';

export interface TooltipConfig extends FloatingConfig {
  debounce: number;
  arrow: boolean;
  arrowPadding: number;
}

export class NgxTooltipConfig extends NgxFloatingConfig implements TooltipConfig {
  debounce = 100;
  arrow = false;
  arrowPadding = 2;

  override middleware: MiddlewareList = [
    offset(8),
    flip()
  ];

  constructor(
    config: Partial<TooltipConfig> = {}
  ) {
    super();
    Object.assign(this, config);
  }
}
