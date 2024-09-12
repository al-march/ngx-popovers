import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { Code, LucideAngularModule } from 'lucide-angular';
import { HighlightService } from '@demo/core/highlight/highlight.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled'
    })),
    provideAnimationsAsync(),
    importProvidersFrom(
      LucideAngularModule.pick({ Code })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (service: HighlightService) => {
        return () => service.init({
          langs: ['ts', 'angular-html', 'scss', 'bash'],
          themes: ['one-dark-pro']
        });
      },
      deps: [HighlightService],
      multi: true
    }
  ]
};
