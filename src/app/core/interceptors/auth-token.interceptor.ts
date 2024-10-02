import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const authToken: any = authService.getToken();
  if (!authService.tokenExists()) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: {
      Authorization: authToken,
    }
  });
  return next(cloned);
};
