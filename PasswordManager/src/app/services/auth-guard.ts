import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivateFn, Router} from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  // Inject services
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to login if not authenticated
    router.navigate(['/login']);
    return false;
  }
}
