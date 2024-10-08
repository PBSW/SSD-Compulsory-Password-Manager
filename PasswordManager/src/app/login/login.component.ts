import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.loginAttempted = true; // Mark as attempted

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Simulate login for now (you'd handle API logic here)
      if (username === 'admin' && password === 'password') {
        this.authService.login('fake-jwt-token');  // Use AuthService for token management
        this.router.navigate(['/home']); // Redirect to home
      } else {
        this.loginError = true; // Show error message
      }
    }
  }

}
