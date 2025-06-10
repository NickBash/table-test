import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { prizmIconsProvideLazyLoader } from '@prizm-ui/icons-loader';
import { prizmIconsFullProvideLazyLoader } from '@prizm-ui/icons-loader/full';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    prizmIconsProvideLazyLoader(),
    prizmIconsFullProvideLazyLoader(),
  ],
};
