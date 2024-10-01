import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseURL = 'localhost:8000';
  const cloned = req.clone({
    url: `${baseURL}${req.url}`,
  })
  return next(cloned);
};
