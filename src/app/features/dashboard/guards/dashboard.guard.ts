import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { concatMap, map, of } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.canAccessDashboard();
};
