import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null; // Store the token

  private authState =  new BehaviorSubject<boolean>(false);


  constructor(private router: Router) {
    const token = this.getToken();

    if (token) {
      this.token = token;
      this.authState.next(true);
    }
  }

  // Call this method to set the token (e.g., after logging in)
  login(token: string): void {
    this.token = token;
    // Optionally, store it in local storage
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  // Call this method to get the token
  getToken(): string | null {
    // Retrieve from local storage if needed
    return this.token || localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  // Call this method to logout
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']); // Redirect to login on logout
  }
}
