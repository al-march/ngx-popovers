import { inject, INJECTOR } from '@angular/core';
import { isServer } from '@ngx-popovers/core';

export function isBrowser(injector = inject(INJECTOR)) {
  return !isServer(injector);
}
