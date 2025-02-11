import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';
import { LoadingInterceptor } from './interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
