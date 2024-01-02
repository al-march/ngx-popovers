import { Injectable } from '@angular/core';
import corePackage from '../../../../../packages/core/package.json';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  version = this.parseVersion();
  npmLink = 'https://www.npmjs.com/package/@ngx-popovers/core';
  gitLink = 'https://github.com/al-march/ngx-popovers';

  parseVersion() {
    return corePackage['version'];
  }
}
