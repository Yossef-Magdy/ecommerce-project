import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkUser().pipe(
    map(response => {
      if (response) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    })
  )
};
