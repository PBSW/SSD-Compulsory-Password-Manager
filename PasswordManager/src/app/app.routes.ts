import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LoginRegisterGuard, VaultAuthGuard} from './services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard] }, // Don't allow login if logged in
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard] }, // Don't allow registration if logged in
  { path: 'home', component: HomeComponent, canActivate: [VaultAuthGuard] }, // Protected route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' }, // Redirect all unknown routes
];
