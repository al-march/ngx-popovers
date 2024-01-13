import { InjectionToken } from '@angular/core';
import { NgxFloatingConfig } from './floating-config';

export const NGX_FLOATING_CONFIG = new InjectionToken<NgxFloatingConfig>('NGX_FLOATING_CONFIG', {
  providedIn: 'root',
  factory: () => new NgxFloatingConfig()
});
