import { Component } from '@angular/core';
import {CredentialsResponse} from '../../models/response';
import {BackendCredentialsService} from '../services/backend-credentials.service';
import {NgForOf, NgIf} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faArrowRight, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {
  CredentialViewEditModalComponent
} from '../modals/credential-view-edit-modal/credential-view-edit-modal.component';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from '../pipes/search-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, FontAwesomeModule, NgbModalModule, FormsModule, SearchPipe, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchText = '';

  credentials: CredentialsResponse[] = [
    {
      id: 1,
      serviceName: 'Google',
      serviceUsername: 'test',
      servicePassword: 'test'
    }
  ];

  constructor(private backendCredentialsService: BackendCredentialsService, private ngbModal: NgbModal) {
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

  openCredential(credential: CredentialsResponse) {
    const modalRef = this.ngbModal.open(CredentialViewEditModalComponent);
    modalRef.componentInstance.credential = credential;
  }

  createNewServiceCredential() {

  }

  protected readonly faArrowRight = faArrowRight;
  protected readonly faTimes = faTimes;
  protected readonly faPlus = faPlus;
}
