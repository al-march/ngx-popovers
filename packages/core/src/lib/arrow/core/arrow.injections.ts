import { InjectionToken, Type } from '@angular/core';
import { ArrowBase } from './arrow-base';

export const NGX_ARROW_COMPONENT = new InjectionToken<Type<any>>('NGX_ARROW_COMPONENT', {
  providedIn: 'root',
  factory: () => {
    return ArrowBase;
  }
});
