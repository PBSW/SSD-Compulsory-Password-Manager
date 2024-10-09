import { Component } from '@angular/core';
import {CredentialsResponse, PartialCredentialsResponse} from '../../models/response';
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
import {CredentialCreateModalComponent} from '../modals/credential-create-modal/credential-create-modal.component';
import {CredentialsCreate} from '../../models/request';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, FontAwesomeModule, NgbModalModule, FormsModule, SearchPipe, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchText = '';

  credentials: PartialCredentialsResponse[] = [];

  constructor(private backendCredentialsService: BackendCredentialsService, private ngbModal: NgbModal) {
    this.backendCredentialsService.getAllServiceCredential().subscribe((credentials) => {
      this.credentials = credentials;
    });
  }


  openCredential(credential: CredentialsResponse) {
    const modalRef = this.ngbModal.open(CredentialViewEditModalComponent);
    modalRef.componentInstance.credential = credential;

    modalRef.result.then(() => {
      this.backendCredentialsService.getAllServiceCredential().subscribe((credentials) => {
        this.credentials = credentials;
      });
    });
  }

  createNewServiceCredential() {
    const modalRef = this.ngbModal.open(CredentialCreateModalComponent);

    modalRef.result.then(() => {
      this.backendCredentialsService.getAllServiceCredential().subscribe((credentials) => {
        this.credentials = credentials;
      });
    });

  }

  protected readonly faArrowRight = faArrowRight;
  protected readonly faTimes = faTimes;
  protected readonly faPlus = faPlus;
}
