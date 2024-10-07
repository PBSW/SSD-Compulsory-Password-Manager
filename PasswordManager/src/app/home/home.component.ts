import { Component } from '@angular/core';
import {CredentialsResponse} from '../../models/response';
import {BackendCredentialsService} from '../services/backend-credentials.service';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbAccordionModule, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  credentials: CredentialsResponse[] = [
    {
      id: 1,
      serviceName: 'Google',
      serviceUsername: 'test',
      servicePassword: 'test'
    }
  ];

  constructor(private backendCredentialsService: BackendCredentialsService) {
    /*
    this.backendCredentialsService.getAllServiceCredential().subscribe((credentials) => {
      this.credentials = credentials;
    });
    */
  }

  logout() {
    //this.backendAuthService.logout();
  }

  deleteCredential(credential: CredentialsResponse) {

  }

}
