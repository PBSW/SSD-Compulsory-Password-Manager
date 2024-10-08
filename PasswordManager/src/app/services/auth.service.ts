import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {CustomJwtPayload} from '../../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null; // Store the token

  private authState =  new BehaviorSubject<string | null>(null);


  constructor(private router: Router) {
    const token = this.getToken();

    if (token) {
      this.token = token;
      this.authState.next(token);
    }
  }

  // Call this method to set the token (e.g., after logging in)
  login(token: string): void {
    this.token = token;
    // Optionally, store it in local storage
    localStorage.setItem('token', token);
    this.authState.next(token);
  }

  // Call this method to get the token
  getToken(): string | null {
    // Retrieve from local storage if needed
    return this.token || localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable().pipe(
      map(token => {

        if (token === null) {
          return false;
        }

        const decoded = jwtDecode<CustomJwtPayload>(token);

        // Check expiration (exp) claim
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          this.logout();
          return false;
        }

        // Check not before (nbf) claim
        if (decoded.nbf && decoded.nbf > now) {
          this.logout();
          return false;
        }

        const issuer = decoded.iss === 'Issuer'; // Check issuer (iss) claim
        const audience = decoded.aud === 'Audience'; // Check audience (aud) claim

        return issuer && audience;
      })
    );
  }

  decodeId(): string | undefined {
    const token = this.getToken();

    if (!token) {
      return undefined;
    }

    const decoded = jwtDecode<CustomJwtPayload>(token);

    console.log(decoded);


    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  // Call this method to logout
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.authState.next(null);
    this.router.navigate(['/login']); // Redirect to login on logout
  }
}
