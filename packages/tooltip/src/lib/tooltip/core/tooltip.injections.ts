import { InjectionToken, Type } from '@angular/core';
import { TooltipBase } from './tooltip-base.component';

export const NGX_TOOLTIP_COMPONENT = new InjectionToken<Type<any>>('NGX-TOOLTIP_COMPONENT', {
  providedIn: 'root',
  factory: () => TooltipBase
});
