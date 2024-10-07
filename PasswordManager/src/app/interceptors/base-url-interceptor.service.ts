import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl: string = 'https://localhost:7157/';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set the new base URL
    const cloned = req.clone({
      url: `${this.baseUrl}${req.url}` // Concatenate base URL with the request URL
    });

    return next.handle(cloned); // Pass the cloned request to the next handler
  }
}
