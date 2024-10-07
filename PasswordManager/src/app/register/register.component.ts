import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.registrationAttempted = true; // Mark as attempted

    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      // Simulate registration logic (You'd handle API logic here)
      console.log('User Registered:', { username, email, password });
      // You can also simulate registration failure for testing purposes:
      // this.registrationError = true; // Uncomment to simulate error
      this.authService.login('fake-jwt-token');  // Automatically login after registration
      this.router.navigate(['/home']); // Redirect to home
    } else {
      this.registrationError = true; // Show error message
    }
  }
}
