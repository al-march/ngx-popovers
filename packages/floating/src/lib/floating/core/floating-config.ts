import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@ngx-popovers/core';

export interface FloatingConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  arrow: boolean;
  arrowPadding: number;
  autoUpdate: boolean;
}

export class NgxFloatingConfig implements FloatingConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  arrow = false;
  arrowPadding = 2;
  autoUpdate = true;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  constructor(
    config: Partial<FloatingConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
