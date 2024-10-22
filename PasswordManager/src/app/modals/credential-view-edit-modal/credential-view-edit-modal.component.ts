import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PasswordGeneratorComponent} from '../../password-generator/password-generator.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {CredentialsResponse, emptyCredentialsResponse, PartialCredentialsResponse} from '../../../models/response';
import {BackendCredentialsService} from '../../services/backend-credentials.service';
import {EncryptionService} from '../../services/encryption.service';


@Component({
  selector: 'app-credential-view-edit-modal',
  standalone: true,
  imports: [NgbModalModule, FormsModule, NgIf, PasswordGeneratorComponent],
  templateUrl: './credential-view-edit-modal.component.html',
  styleUrl: './credential-view-edit-modal.component.scss'
})
export class CredentialViewEditModalComponent implements OnInit {
  @Input() inputCredential!: PartialCredentialsResponse; // This will receive the credential data from the parent component
  credential: CredentialsResponse | undefined; // object for viewing
  editedCredential: CredentialsResponse  = emptyCredentialsResponse; // object for editing
  isPasswordVisible = false;
  isEditMode: boolean = false; // Initially in view mode

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private backend: BackendCredentialsService,
    private encryptionService: EncryptionService
  ) {

  }


  ngOnInit(): void {
    this.backend.getServiceCredentials(this.inputCredential.id).subscribe(async (credential) => {
      if (!credential) {
        return;
      }

      let tempCredential: CredentialsResponse = {
        id: credential.id,
        serviceName: credential.serviceName,
        serviceUsername: credential.serviceUsername,
        servicePassword: credential.servicePassword
      }


      // Decrypt the password
      const key = sessionStorage.getItem('key');
      if (!key) {
        console.error('Key not found');
        return;
      }

      tempCredential.servicePassword = await this.encryptionService.decrypt(tempCredential.servicePassword, key);


      this.credential = tempCredential;
      this.editedCredential = { ...tempCredential };
    });
  }


  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Copy password to clipboard
  async copyPasswordToClipboard(): Promise<void> {
    const passwordField = document.getElementById('servicePassword') as HTMLInputElement;
    if (passwordField) {

      const passwordText = passwordField.value; // Get the value of the input field

      if (!navigator.clipboard) {
        passwordField.select();
        document.execCommand('copy');

      } else {
        await navigator.clipboard.writeText(passwordText)
      }

    }
  }

  // Toggle between edit and view mode
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  // Update the credentials
  async update() {
    // Logic to handle the update goes here (e.g., make API call)

    if (!this.credential) {
      return;
    }

    this.credential = {
      id: this.credential.id,
      serviceName: this.editedCredential.serviceName,
      serviceUsername: this.editedCredential.serviceUsername,
      servicePassword: this.editedCredential.servicePassword
    };

    let request: CredentialsResponse = {
      id: this.credential.id,
      serviceName: this.credential.serviceName,
      serviceUsername: this.credential.serviceUsername,
      servicePassword: this.credential.servicePassword
    }

    // Encrypt the password in request
    const key = sessionStorage.getItem('key');
    if (!key) {
      console.error('Key not found');
      return;
    }

    request.servicePassword = await this.encryptionService.encrypt(request.servicePassword, key);

    this.backend.updateServiceCredentials(request).subscribe((value) => {
      if (value) {
        this.credential = value;
      }
    });

    this.isEditMode = false;
  }

  onPasswordGenerated(newPassword: string) {
    if (this.isEditMode) {
      this.editedCredential!.servicePassword = newPassword; // Update password field with generated password
    }
  }

  // Close the modal
  close() {
    this.activeModal.close();
  }

  openDeleteConfirmation() {
    // Open a confirmation modal for deleting the credential
    const modalRef = this.modalService.open(ConfirmationModalComponent);

    modalRef.componentInstance.title = 'Delete Credential';
    modalRef.componentInstance.message = 'Are you sure you want to delete this credential?';
    modalRef.componentInstance.confirmButtonText = 'Delete';

    modalRef.closed.subscribe((result) => {
      if (result) {

        if (!this.credential) {
          return;
        }

        this.backend.deleteServiceCredentials(this.credential).subscribe(() => {
          this.activeModal.close();
        });
      }
    });
  }

}
