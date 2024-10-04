import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case HttpStatusCode.InternalServerError:
          console.error('An error occured in the backend server');
          break;
        case HttpStatusCode.Forbidden:
          router.navigate(['/forbidden']);
          break;
        case HttpStatusCode.NotFound:
          router.navigate(['/not-found']);
          break;
        default:
          console.error('HTTP error:', error);
      }
      return throwError(() => error);
    })
  );
};
