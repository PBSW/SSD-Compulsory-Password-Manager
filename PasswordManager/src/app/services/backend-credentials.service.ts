import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CredentialsResponse, PartialCredentialsResponse} from '../../models/response';

import {map, Observable, of} from 'rxjs';

import {CredentialsCreate} from '../../models/request';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendCredentialsService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllServiceCredential(): Observable<PartialCredentialsResponse[]> {
    return this.http.get<PartialCredentialsResponse[]>('/credentials/getAllByUser');
  }

  getServiceCredentials(id: number): Observable<CredentialsResponse> {
    return this.http.get<CredentialsResponse>('/credentials/get/' + id);
  }

  createServiceCredential(dto: CredentialsCreate): Observable<CredentialsResponse> {
    return this.http.post<CredentialsResponse>('/credentials/create', dto);
  }

  updateServiceCredentials(credential: CredentialsResponse): Observable<CredentialsResponse> {
    return this.http.put<CredentialsResponse>('/credentials', credential);
  }

  deleteServiceCredentials(credential: CredentialsResponse): Observable<boolean> {
    // get httpReponse
    return this.http.delete<HttpResponse<any>>('/credentials/delete/' + credential.id).pipe(
      map(response => response.ok)
    );
  }


}
