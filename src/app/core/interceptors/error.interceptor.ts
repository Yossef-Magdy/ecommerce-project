import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          if (router.url != '/auth/login') {
            router.navigate(['/auth/login']);
          }
          break;
        case HttpStatusCode.Forbidden:
          router.navigate(['/forbidden']);
          break;
        case HttpStatusCode.NotFound:
          router.navigate(['/not-found']);
          break;
        default:
          console.log('HTTP error:', error);
      }
      return throwError(() => error);
    })
  );
};
