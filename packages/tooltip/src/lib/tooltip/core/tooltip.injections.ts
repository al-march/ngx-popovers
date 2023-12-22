import { InjectionToken, Type } from '@angular/core';
import { TooltipBase } from './tooltip-base.component';
import { NgxTooltipConfig } from './tooltip-config';

export const NGX_TOOLTIP_CONFIG = new InjectionToken<NgxTooltipConfig>('NGX_TOOLTIP_CONFIG', {
  providedIn: 'root',
  factory: () => new NgxTooltipConfig()
});

export const NGX_TOOLTIP_COMPONENT = new InjectionToken<Type<any>>('NGX-TOOLTIP_COMPONENT', {
  providedIn: 'root',
  factory: () => TooltipBase
});
