import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { Code, LucideAngularModule } from 'lucide-angular';
import { HighlightService } from '@demo/core/highlight/highlight.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })),
    provideAnimationsAsync(),
    importProvidersFrom(
      LucideAngularModule.pick({ Code })
    ),
    provideAppInitializer(async () => {
      const service = inject(HighlightService);
      await service.init({
        langs: ['ts', 'angular-html', 'scss', 'bash'],
        themes: ['one-dark-pro']
      });
    })
  ]
};
