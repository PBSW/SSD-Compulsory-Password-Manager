import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CredentialsResponse} from '../../models/response';

import {map, Observable, of} from 'rxjs';

import {CredentialsCreate} from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class BackendCredentialsService {

  constructor(private http: HttpClient) { }
/*
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

  deleteServiceCredentials1(credential: CredentialsResponse): Observable<boolean> {
    // get httpReponse
    return this.http.delete<HttpResponse<any>>('/credentials/' + credential.id).pipe(
      map(response => response.ok)
    );
  }
*/


  private mockCredentials: CredentialsResponse[] = [
    { id: 1, serviceName: 'Service One', serviceUsername: 'user1', servicePassword: 'password1' },
    { id: 2, serviceName: 'Service Two', serviceUsername: 'user2', servicePassword: 'password2' },
    { id: 3, serviceName: 'Service Three', serviceUsername: 'user3', servicePassword: 'password3' },
  ];

  getAllServiceCredential(): Observable<CredentialsResponse[]> {
    return of(this.mockCredentials); // Simulates an API response with all credentials
  }

  getServiceCredentials(id: number): Observable<CredentialsResponse> {
    const credential = this.mockCredentials.find(c => c.id === id);
    return of(credential!); // Simulates an API response with a specific credential
  }

  createServiceCredential(dto: CredentialsCreate): Observable<CredentialsResponse> {
    const newCredential: CredentialsResponse = {
      id: this.mockCredentials.length + 1,
      serviceName: dto.serviceName,
      serviceUsername: dto.serviceUsername,
      servicePassword: dto.servicePassword
    };
    this.mockCredentials.push(newCredential);
    return of(newCredential); // Simulates a successful creation response
  }

  updateServiceCredentials(credential: CredentialsResponse): Observable<CredentialsResponse | null> {
    const index = this.mockCredentials.findIndex(c => c.id === credential.id);
    if (index !== -1) {
      this.mockCredentials[index] = credential; // Updates the credential
      return of(credential); // Simulates a successful update response
    }
    return of(null!); // Return null if not found
  }

  deleteServiceCredentials(credential: CredentialsResponse): Observable<boolean> {
    this.mockCredentials = this.mockCredentials.filter(c => c.id !== credential.id);
    return of(true); // Simulates a successful deletion response
  }
}
