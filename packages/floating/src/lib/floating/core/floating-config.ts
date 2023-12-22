import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@ngx-popovers/core';

export interface FloatingConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  arrow: boolean;
  arrowPadding: number;
}

export class NgxFloatingConfig implements FloatingConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  arrow = false;
  arrowPadding = 2;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
