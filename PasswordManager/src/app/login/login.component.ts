import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';
import {BackendAuthService} from '../services/backend-auth.service';
import {LoginRequest} from '../../models/request';
import {catchError, of, tap} from 'rxjs';
import {KeyDerivationService} from '../services/key-derivation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginAttempted: boolean = false;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private backend: BackendAuthService,
    private router: Router,
    private keyDerivationService: KeyDerivationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.loginAttempted = true; // Mark as attempted

    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;

      const hashedPassword = await this.hashPassword(password); // Hash the password to avoid cleartext traffic

      const request: LoginRequest = {username: username, password: hashedPassword}; // Create the request object

      // Call the backend service to authenticate
      this.backend.login(request).pipe(
        tap(async (token) => {

          // Get user encryption key
          const key = await this.keyDerivationService.deriveKey(username, password); // Derive a key from the password
          const keyBase64 = await this.keyDerivationService.exportKey(key); // Convert the key to a base64 string
          sessionStorage.setItem('key', keyBase64); // Store the key in session storage

          this.authService.login(token.token); // Use AuthService for token management

          await this.router.navigate(['/home']); // Redirect to home on success
        }),
        catchError((error) => {
          this.loginError = true; // Show error message
          console.error('Login error:', error); // Optionally log the error
          return of(null); // Return an observable to complete the stream
        })
      ).subscribe(); // Subscribe to execute the stream
    }
  }

  // Hash the password using SHA-256
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return this.bufferToHex(hashBuffer); // Convert the ArrayBuffer to a hex string
  }

// Helper method to convert ArrayBuffer to a hex string
  bufferToHex(buffer: ArrayBuffer): string {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

}
