import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@ngx-popovers/core';

export interface PopoverConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  arrow: boolean;
  arrowPadding: number;
  autoUpdate: boolean;
  bindTo?: HTMLElement | string;
}

export class NgxPopoverConfig implements PopoverConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  arrow = false;
  arrowPadding = 2;
  autoUpdate = true;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  bindTo?: HTMLElement | string;

  constructor(
    config: Partial<PopoverConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
