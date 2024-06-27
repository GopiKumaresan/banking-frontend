import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { AuthGuardService } from './guard/auth-guard.service';
import { LoginGuardService } from './guard/login-guard.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthGuardService, LoginGuardService,
    provideHttpClient(), provideRouter(routes),
    provideAnimations(), // required animations providers
    provideToastr(),]
};

