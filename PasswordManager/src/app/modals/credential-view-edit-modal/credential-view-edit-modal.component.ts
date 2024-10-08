import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-credential-view-edit-modal',
  standalone: true,
  imports: [NgbModalModule],
  templateUrl: './credential-view-edit-modal.component.html',
  styleUrl: './credential-view-edit-modal.component.scss'
})
export class CredentialViewEditModalComponent {
  @Input() credential: any; // This will receive the credential data from the parent component
  isPasswordVisible = false;

  constructor(public activeModal: NgbActiveModal) {}

  // Close the modal
  close(): void {
    this.activeModal.close();
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
}
