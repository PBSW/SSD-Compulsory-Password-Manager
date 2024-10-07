import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  isAuthenticated(): boolean {
    // Check local storage or session storage for authentication token
    return !!localStorage.getItem('authToken');
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

}
