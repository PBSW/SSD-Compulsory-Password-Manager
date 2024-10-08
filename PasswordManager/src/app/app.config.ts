import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {authInterceptor} from './interceptors/auth-interceptor';
import {baseUrlInterceptor} from './interceptors/base-url-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Your existing router configuration
    provideHttpClient(withInterceptors([
      authInterceptor,
      baseUrlInterceptor
    ])), // Add HttpClientModule
    AuthService,

  ]

};
