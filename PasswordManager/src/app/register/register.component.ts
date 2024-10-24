import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';
import {RegisterRequest} from '../../models/request';
import {BackendAuthService} from '../services/backend-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationAttempted: boolean = false;
  registrationError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private backend: BackendAuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordsMatch});
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : {mismatch: true};
  }

  async onSubmit(): Promise<void> {
    this.registrationAttempted = true; // Mark as attempted

    if (this.registerForm.valid) {
      const {username, email, password} = this.registerForm.value;

      const hashedPassword = await this.hashPassword(password); // Hash the password to avoid cleartext traffic

      const request: RegisterRequest = {username: username, email: email, password: hashedPassword};

      // Call the backend service to register
      this.backend.register(request).subscribe(
        (success) => {
          if (success) {
            this.registrationError = success;
            this.router.navigate(['/login']); // Redirect to login
          } else {
            this.registrationError = true; // Show error message
          }
        },
        () => {
          this.registrationError = true; // Show error message
        }
      );

    } else {
      this.registrationError = true; // Show error message
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
