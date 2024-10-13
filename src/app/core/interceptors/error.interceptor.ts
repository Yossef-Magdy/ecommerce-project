import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case HttpStatusCode.InternalServerError:
          console.error('An error occured in the backend server');
          toast.showToast('An error occured in the backend server', 'error');
          break;
        case HttpStatusCode.Forbidden:
          router.navigate(['/forbidden']);
          break;
        case HttpStatusCode.NotFound:
          router.navigate(['/not-found']);
          break;
        case HttpStatusCode.BadRequest:
        case HttpStatusCode.UnprocessableEntity:
          const errors = error.error.errors;
          const key = Object.keys(errors)[0];
          const message = errors[key][0];
          toast.showToast(message, 'error');
          break;
        default:
          console.error('HTTP error:', error);
      }
      return throwError(() => error);
    })
  );
};