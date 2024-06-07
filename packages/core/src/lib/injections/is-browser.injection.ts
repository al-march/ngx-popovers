import { inject, INJECTOR } from '@angular/core';
import { isServer } from './is-server.injection';

export function isBrowser(injector = inject(INJECTOR)) {
  return !isServer(injector);
}
