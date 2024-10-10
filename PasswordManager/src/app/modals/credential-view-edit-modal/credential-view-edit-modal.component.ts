import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PasswordGeneratorComponent} from '../../password-generator/password-generator.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {
  CredentialsResponse,
  PartialCredentialsResponse
} from '../../../models/response';
import {BackendCredentialsService} from '../../services/backend-credentials.service';


@Component({
  selector: 'app-credential-view-edit-modal',
  standalone: true,
  imports: [NgbModalModule, FormsModule, NgIf, PasswordGeneratorComponent],
  templateUrl: './credential-view-edit-modal.component.html',
  styleUrl: './credential-view-edit-modal.component.scss'
})
export class CredentialViewEditModalComponent implements OnInit {
  @Input() inputCredential!: PartialCredentialsResponse; // This will receive the credential data from the parent component
  credential!: CredentialsResponse // object for viewing
  editedCredential!: CredentialsResponse // object for editing
  isPasswordVisible = false;
  isEditMode: boolean = false; // Initially in view mode

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private backend: BackendCredentialsService
  ) {

  }


  ngOnInit(): void {
    this.backend.getServiceCredentials(this.inputCredential.id).subscribe((credential) => {
      this.credential = credential;
      this.editedCredential = { ...credential };
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
  update() {
    // Logic to handle the update goes here (e.g., make API call)

    this.credential = { ...this.editedCredential };
    this.backend.updateServiceCredentials(this.credential).subscribe((value) => {
      if (value) {
        this.credential = value;
      }
    });

    this.isEditMode = false;
  }

  onPasswordGenerated(newPassword: string) {
    this.credential.servicePassword = newPassword; // Update password field with generated password
  }

  // Close the modal
  close() {
    this.activeModal.dismiss();
  }

  openDeleteConfirmation() {
    // Open a confirmation modal for deleting the credential
    const modalRef = this.modalService.open(ConfirmationModalComponent);

    modalRef.componentInstance.title = 'Delete Credential';
    modalRef.componentInstance.message = 'Are you sure you want to delete this credential?';
    modalRef.componentInstance.confirmButtonText = 'Delete';

    modalRef.closed.subscribe((result) => {
      if (result) {
        this.backend.deleteServiceCredentials(this.credential).subscribe(() => {
          this.activeModal.close();
        });
      }
    });
  }

}
