import { Derivable, FlipOptions, OffsetOptions, Placement, ShiftOptions } from '@ngx-popovers/core';

export interface TooltipConfig {
  placement: Placement;
  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  offset?: OffsetOptions;
  debounce: number;
  arrow: boolean;
  arrowPadding: number;
  autoUpdate: boolean;
  bindTo?: HTMLElement | string;
}

export class NgxTooltipConfig implements TooltipConfig {
  placement: Placement = 'bottom';
  offset: OffsetOptions = 4;
  debounce = 100;
  arrow = false;
  arrowPadding = 2;
  autoUpdate = false;

  flip?: FlipOptions | Derivable<FlipOptions>;
  shift?: ShiftOptions | Derivable<ShiftOptions>;
  bindTo?: HTMLElement | string;

  constructor(
    config: Partial<TooltipConfig> = {}
  ) {
    Object.assign(this, config);
  }
}
