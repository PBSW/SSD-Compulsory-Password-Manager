import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CredentialsCreate} from '../../../models/request';
import {FormsModule} from '@angular/forms';
import {PasswordGeneratorComponent} from '../../password-generator/password-generator.component';
import {BackendCredentialsService} from '../../services/backend-credentials.service';

@Component({
  selector: 'app-credential-create-modal',
  standalone: true,
  imports: [
    FormsModule,
    PasswordGeneratorComponent
  ],
  templateUrl: './credential-create-modal.component.html',
  styleUrl: './credential-create-modal.component.scss'
})
export class CredentialCreateModalComponent {

  credential: CredentialsCreate = {
    serviceName: '',
    serviceUsername: '',
    servicePassword: ''
  };

  constructor(public activeModal: NgbActiveModal, private backend: BackendCredentialsService) {}

  onCreate() {
    this.backend.createServiceCredential(this.credential).subscribe((value) => {
      if (value) {
        this.activeModal.close(); // Close the modal
      }
    });
  }

  onCancel() {
    this.activeModal.dismiss(); // Dismiss the modal without doing anything
  }

  onPasswordGenerated(newPassword: string) {
    this.credential.servicePassword = newPassword; // Update password field with generated password
  }
}
