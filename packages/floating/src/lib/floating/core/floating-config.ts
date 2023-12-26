import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@ngx-popovers/core';

export interface FloatingConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  arrowPadding: number;
  autoUpdate: boolean;

  bindTo?: HTMLElement | string;
}

export class NgxFloatingConfig implements FloatingConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  arrowPadding = 2;
  autoUpdate = true;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  bindTo?: HTMLElement | string;

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
