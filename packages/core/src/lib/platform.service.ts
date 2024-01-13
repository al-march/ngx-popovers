import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class PlatformService {
  platformId = inject(PLATFORM_ID);

  isServer = () => isPlatformServer(this.platformId);
  isBrowser = () => isPlatformBrowser(this.platformId);
}
