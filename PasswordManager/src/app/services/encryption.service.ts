import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  // Helper function to convert base64 to ArrayBuffer
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Import the base64 key as a CryptoKey
  private async importKey(base64Key: string): Promise<CryptoKey> {
    const keyBuffer = this.base64ToArrayBuffer(base64Key);
    return crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'AES-GCM' },
      true, // The key is exportable
      ['encrypt', 'decrypt'] // Usages for this key
    );
  }

  // Encrypt data using AES-GCM with a base64 key
  async encrypt(data: string, base64Key: string): Promise<string> {
    const key = await this.importKey(base64Key); // Import the base64 key
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
    const encodedData = new TextEncoder().encode(data);

    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encodedData
    );

    // Combine IV and encrypted data
    const combinedBuffer = new Uint8Array(iv.length + encryptedData.byteLength);
    combinedBuffer.set(iv, 0);
    combinedBuffer.set(new Uint8Array(encryptedData), iv.length);

    // Convert to base64 for storage or transmission
    return btoa(String.fromCharCode(...combinedBuffer));
  }

  // Decrypt data using AES-GCM with a base64 key
  async decrypt(encryptedData: string, base64Key: string): Promise<string> {
    const key = await this.importKey(base64Key); // Import the base64 key

    // Decode base64 to get the encrypted buffer
    const encryptedBuffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    // Extract IV (first 12 bytes) and ciphertext
    const iv = encryptedBuffer.slice(0, 12);
    const ciphertext = encryptedBuffer.slice(12);

    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      ciphertext
    );

    // Convert decrypted data back to string
    return new TextDecoder().decode(decryptedData);
  }
}
