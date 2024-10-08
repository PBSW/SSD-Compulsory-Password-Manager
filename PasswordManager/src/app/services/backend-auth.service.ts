import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LoginRequest, RegisterRequest} from '../../models/request';
import {map, Observable, take} from 'rxjs';
import {LoginResponse} from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class BackendAuthService {

  constructor(private http: HttpClient) { }

  login(dto: LoginRequest): Observable<string> {
    return this.http.post<string>("/auth/login", dto);
  }

  register(dto: RegisterRequest): Observable<boolean> {
    return this.http.post<HttpResponse<any>>("/auth/register", dto)
      .pipe(take(1))
      .pipe(
      //map to check if the status code is 200
      map((response: HttpResponse<any>) => {
        return response.status === 200;
      })
    )
  }
}
