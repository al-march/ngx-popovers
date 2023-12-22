import { Placement } from '@floating-ui/dom';
import { Derivable, FlipOptions, OffsetOptions, ShiftOptions } from '@ngx-popovers/core';

export interface TooltipConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  debounce: number;
  arrow: boolean;
  arrowPadding: number;
}

export class NgxTooltipConfig implements TooltipConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  debounce = 100;
  arrow = false;
  arrowPadding = 2;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;

  constructor(
    config: Partial<TooltipConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
