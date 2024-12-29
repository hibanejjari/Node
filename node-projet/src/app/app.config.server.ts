import { ApplicationConfig } from '@angular/core';
import { provideServerRoutesConfig } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

export const config: ApplicationConfig = {
  providers: [
    provideServerRoutesConfig(serverRoutes),
  ],
};
