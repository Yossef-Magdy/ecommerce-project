import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { map } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.hasRolesOrPermissions().pipe(
    map(response => {
      if (response) {
        return true;
      }
      router.navigate(['/forbidden']);
      return false;
    })
  )
};
