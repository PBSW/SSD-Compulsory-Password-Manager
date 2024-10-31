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

      const hashedPassword = await this.hashPassword(password, username); // Hash the password to avoid cleartext traffic

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
  async hashPassword(password: string, username: any): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Round 1
    const hash1Buffer = await crypto.subtle.digest('SHA-256', data);
    const hash1 = this.bufferToHex(hash1Buffer); // Convert the ArrayBuffer to a hex string

    // Round 2
    const data2 = encoder.encode(username + hash1); // Combine the username and first hash

    const hash2Buffer = await crypto.subtle.digest('SHA-256', data2);
    const hash2 = this.bufferToHex(hash2Buffer); // Convert the ArrayBuffer to a hex string

    // combine the two hashes and final hash
    const finalHash = hash1 + hash2;
    const finalHashBuffer = encoder.encode(finalHash);

    const hashBuffer = await crypto.subtle.digest('SHA-256', finalHashBuffer);
    return this.bufferToHex(hashBuffer); // Convert the ArrayBuffer to a hex string
  }

// Helper method to convert ArrayBuffer to a hex string
  bufferToHex(buffer: ArrayBuffer): string {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

}
