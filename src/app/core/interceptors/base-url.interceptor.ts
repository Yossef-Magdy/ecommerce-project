import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseURL = 'http://127.0.0.1:8000/api';
  const cloned = req.clone({
    url: `${baseURL}${req.url}`,
  })
  return next(cloned);
};
