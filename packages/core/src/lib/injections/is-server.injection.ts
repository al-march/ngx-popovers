import { inject, INJECTOR } from '@angular/core';
import { PlatformService } from '../platform.service';

export function isServer(injector = inject(INJECTOR)) {
  const platform = injector.get(PlatformService);
  return platform.isServer();
}
