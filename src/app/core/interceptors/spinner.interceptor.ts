import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';



export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.addRequest();
  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => {
      loadingService.removeRequest();
      if (loadingService.isAllCompleted()) {
        loadingService.loadingOff();
      }
    })
  );
}