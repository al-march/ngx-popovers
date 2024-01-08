import { FloatingConfig, NgxFloatingConfig } from '@ngx-popovers/core';

export interface PopoverConfig extends FloatingConfig {
  arrow: boolean;
  arrowPadding: number;

  closeOnClickedOutside: boolean;
}

export class NgxPopoverConfig extends NgxFloatingConfig implements PopoverConfig {
  arrow = true;
  arrowPadding = 2;
  override autoUpdate = true;
  closeOnClickedOutside = true;

  constructor(
    config: Partial<PopoverConfig> = {}
  ) {
    super();
    Object.assign(this, config);
  }
}
