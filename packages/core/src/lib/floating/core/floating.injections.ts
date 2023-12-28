import { InjectionToken, Type } from '@angular/core';
import { FloatingArrowBase } from './floating-arrow-base';
import { NgxFloatingConfig } from './floating-config';

export const NGX_FLOATING_CONFIG = new InjectionToken<NgxFloatingConfig>('NGX_FLOATING_CONFIG', {
  providedIn: 'root',
  factory: () => new NgxFloatingConfig()
});

export const NGX_FLOATING_ARROW_COMPONENT = new InjectionToken<Type<any>>('NGX_FLOATING_ARROW_COMPONENT', {
  providedIn: 'root',
  factory: () => {
    return FloatingArrowBase;
  }
});
