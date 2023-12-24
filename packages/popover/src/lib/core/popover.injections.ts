import { InjectionToken } from '@angular/core';
import { NgxPopoverConfig } from './popover-config';

export const NGX_POPOVER_CONFIG = new InjectionToken('NGX_POPOVER_CONFIG', {
  providedIn: 'root',
  factory: () => new NgxPopoverConfig()
});
