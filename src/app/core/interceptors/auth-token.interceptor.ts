import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = "token";
  if (!authToken) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    }
  });
  return next(cloned);
};
