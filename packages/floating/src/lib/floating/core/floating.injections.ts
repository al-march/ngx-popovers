import { InjectionToken, Type } from '@angular/core';
import { FloatingArrowBase } from './floating-arrow-base';

export const NGX_FLOATING_ARROW_COMPONENT = new InjectionToken<Type<any>>('NGX_FLOATING_ARROW_COMPONENT', {
  providedIn: 'root',
  factory: () => {
    return FloatingArrowBase;
  }
});
