import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null; // Store the token

  constructor(private router: Router) {}

  // Call this method to set the token (e.g., after logging in)
  login(token: string): void {
    this.token = token;
    // Optionally, store it in local storage
    localStorage.setItem('token', token);
  }

  // Call this method to get the token
  getToken(): string | null {
    // Retrieve from local storage if needed
    return this.token || localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  // Call this method to logout
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to login on logout
  }
}
