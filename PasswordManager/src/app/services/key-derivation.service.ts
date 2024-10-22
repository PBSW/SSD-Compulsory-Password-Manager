import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyDerivationService {


  private stringToArrayBuffer(input: string): ArrayBuffer {
    return new TextEncoder().encode(input);
  }


  async deriveKey(username: string, password: string): Promise<CryptoKey> {
    const salt = this.stringToArrayBuffer(username); // Use username as the salt
    const passwordBuffer = this.stringToArrayBuffer(password);

    // Import the password as a key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    // Derive a key using PBKDF2
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,  // Higher iterations = more secure but slower
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 }, // AES 256-bit encryption key
      true,  // Whether the key can be exported
      ['encrypt', 'decrypt']
    );
  }

  // convert a CryptoKey to a base64 string
  async exportKey(cryptoKey: CryptoKey): Promise<string> {
    const exported = await crypto.subtle.exportKey('raw', cryptoKey);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }
}
