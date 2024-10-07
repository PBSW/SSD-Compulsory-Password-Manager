import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CredentialsResponse} from '../../models/response';

import {Observable} from 'rxjs';

import {CredentialsCreate} from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class BackendCredentialsService {

  constructor(private http: HttpClient) { }

  getAllServiceCredential(): Observable<CredentialsResponse[]> {
    return this.http.get<CredentialsResponse[]>('/credentials/getAllByUser');
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

  deleteServiceCredentials(credential: CredentialsResponse) {
    return this.http.delete('credentials/' + credential.id);
  }

}
