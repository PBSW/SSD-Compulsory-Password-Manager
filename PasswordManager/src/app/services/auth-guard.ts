import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivateFn, Router} from '@angular/router';
import {map} from 'rxjs';

export const VaultAuthGuard: CanActivateFn = () => {
  // Inject services
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
}

// If the user is authenticated, don't send them to the login page
export const LoginRegisterGuard: CanActivateFn = () => {
  // Inject services
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
}
