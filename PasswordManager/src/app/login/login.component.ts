import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {NgIf} from '@angular/common';
import {BackendAuthService} from '../services/backend-auth.service';
import {LoginRequest} from '../../models/request';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private backend: BackendAuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.loginAttempted = true; // Mark as attempted

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const request: LoginRequest =  { username, password };

      // Call the backend service to authenticate
      this.backend.login(request).subscribe(
        (token) => {

          this.authService.login(token); // Use AuthService for token management

          this.router.navigate(['/home']); // Redirect to home on success
        },
        () => {
          this.loginError = true; // Show error message
        }
      );


    }
  }

}
