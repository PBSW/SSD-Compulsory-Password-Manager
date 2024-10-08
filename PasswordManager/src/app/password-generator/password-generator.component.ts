import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent {
  passwordLength = 12;
  includeUppercase = true;
  includeNumbers = true;
  includeSpecialChars = true;

  @Output() passwordGenerated = new EventEmitter<string>();

  generatePassword() {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    if (this.includeUppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (this.includeNumbers) {
      characters += '0123456789';
    }
    if (this.includeSpecialChars) {
      characters += '!@#$%^&*()_+-=[]{}|;:",.<>?';
    }

    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    // Emit the generated password back to the parent component
    this.passwordGenerated.emit(password);
  }
}
