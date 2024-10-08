import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LoginRequest, RegisterRequest} from '../../models/request';
import {map, Observable, take} from 'rxjs';
import {TokenResponse} from '../../models/response';


@Injectable({
  providedIn: 'root'
})
export class BackendAuthService {

  constructor(private http: HttpClient) { }

  login(dto: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>("/auth/login", dto);
  }

  register(dto: RegisterRequest): Observable<boolean> {
    return this.http.post<boolean>("/auth/register", dto);
  }
}
