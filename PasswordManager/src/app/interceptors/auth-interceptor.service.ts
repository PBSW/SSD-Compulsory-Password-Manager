import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = req.url;
    // If url is login or register, forward without token
    if (url.endsWith('/login') || url.endsWith('/register')) {
      return next.handle(req);
    }


    // Get the token from the AuthService
    const token = this.authService.getToken();

    // Clone the request and set the new header
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Add the token in Authorization header
        }
      });
      return next.handle(cloned); // Pass the cloned request instead of the original request to the next handler
    }

    return next.handle(req); // If no token, just pass the original request
  }
}
