import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import hljs from 'highlight.js/lib/core';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import { UNIVERSAL_PROVIDERS } from '@ng-web-apis/universal';

hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled'
    })),
    provideAnimations(),
    provideAnimationsAsync(),
    importProvidersFrom(TuiRootModule),
    UNIVERSAL_PROVIDERS
  ]
};
