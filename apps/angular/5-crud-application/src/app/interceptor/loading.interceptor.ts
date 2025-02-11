import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../service/loading.service';

export function loadingInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true);
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    }),
  );
}
