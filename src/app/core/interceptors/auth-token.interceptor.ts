import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: {
      Authorization: authToken,
    }
  });
  return next(cloned);
};
