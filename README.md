# SSD Compulsory Assignment/Mini-Project

This repository is a for a password manager built for Secure Software Development [per the assignment.](https://rpede.github.io/SecureSoftwareDevelopment/assignments/mini-project)
The project was built by [Rasmus](https://github.com/sandbxk) and [Philip](https://github.com/philezad).

While the project was only made by two people, considerations for the 3- and 4-persons goals were still made. The distributed systems model was specfically made to provide a way for cross-device access to crendentials, given that the backend would be hosted in a production environment, and thus (with a bit of tweaking), be made available for a frontend/app targeting a different platform. Arguably, cross-device access would already be feasible if the system was deployed, as the Angular frontend would be accessible on almost anything with a web browser.
____________

- [SSD Compulsory Assignment/Mini-Project](#ssd-compulsory-assignmentmini-project)
  - [How to run the application](#how-to-run-the-application)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Screenshots](#screenshots)
  - [Security Model discussion](#security-model-discussion)
    - [What are we protecting against?](#what-are-we-protecting-against)
    - [Security Model](#security-model)
      - [Backend security](#backend-security)
        - [Key handling](#key-handling)
        - [Encryption](#encryption)
        - [Password Hashing and Salting](#password-hashing-and-salting)
        - [JWTs](#jwts)
        - [CORS Configuration](#cors-configuration)
        - [HTTPS Enforcement](#https-enforcement)
      - [Access Control](#access-control)
      - [Frontend security](#frontend-security)
    - [Pitfalls and limitation in security](#pitfalls-and-limitation-in-security)

## How to run the application

The project contains two "applications", the frontend and backend. Both of which must be running simultaneously.

### Backend

1. The backend is built with DotNet and therefore requires you to have the .NET SDK installed.
2. Open a terminal.
3. Navigate to the *PM-API* directory with `cd .\PM-API\`.
4. Call `dotnet restore` to fetch any missing dependencies.
5. Run the backend with `dotnet run`.

The backend should now be available at `https://localhost:7157`

### Frontend

1. The frontend is built with Angular 18 and this requires you to have both Node.js and installed and the Angular CLI installed. After having installed node, the Angular CLI can be installed via `npm install -g @angular/cli`.
2. Open a terminal.
3. Navigate to the *PasswordManager* directory with `cd .\PasswordManager\`.
4. Run `npm install` to install all the dependencies.
5. Run the backend with `ng servce`.

The frontend should now be available at `http://localhost:4200`

## Screenshots

screenshot.png

## Security Model discussion

### What are we protecting against?

Bad actors/malicous users, data breaches. Who are our threat actors?
Auth handling.

### Security Model

#### Backend security

##### Key handling

a

##### Encryption

To protect sensitive data at rest, AES-256 is used to handle password encryption in the app. The CryptographyHelper, used for decryption and encryption, takes a base64-encoded key from CryptographyOptions, ensuring it's a valid length for AES (16, 24, or 32 bytes). For each password, a new IV is generated and stored along with the encrypted data. This way, even if the same password is used multiple times, the result will be different.

Passwords are encrypted before being saved to the database, and the stored IV allows them to be decrypted later. The same key is used across all encryption/decryption, but the IV ensures unique encryption every time.

##### Password Hashing and Salting

Password hashing is essential to ensure that even if an attacker gains access to the database, they cannot easily retrieve user passwords. Our implementation utilizes a secure hashing algorithm, such as PBKDF2, bcrypt, or Argon2, to hash passwords before storing them in the database.

Each password is combined with a unique salt value before being hashed. The salt is a random string that is stored alongside the hashed password in the database. The purpose of the salt is to ensure that identical passwords result in different hash values, thereby protecting against rainbow table attacks and making it significantly harder for attackers to crack passwords using precomputed hashes.

For our implementation:

    Salt Generation: A unique salt is generated for each password when it is created or changed.
    Hashing: The salted password is hashed using the PBKDF2 algorithm with a high number of iterations, which makes brute-force attacks computationally expensive.
    Storing: Only the salt and the hashed password are stored in the database, and not the plaintext password itself.

##### JWTs

WTs (JSON Web Tokens)

JWTs are used to handle authentication in our application. When a user logs in, a JWT is generated and signed using a secret key. This token is then sent to the client, which stores it for subsequent API requests. The client includes this token in the Authorization header of each request to authenticate itself with the backend.

Key features of JWT implementation:

    Signature Verification: Each token is signed using a secure algorithm (HMAC SHA-256) to ensure its integrity. The backend verifies this signature to prevent tampering.
    Expiration: Tokens have a defined expiration time to limit their lifetime and reduce the risk of misuse.
    Claims: The token contains claims such as the user's ID, name, and roles to identify the user without repeatedly querying the database.

By using JWTs, we ensure that sensitive information is not included in requests and responses, minimizing the chances of a data leak.

##### CORS Configuration

As this is a distributed system, CORS must be configured in order for the frontend and backend to communicate. Since only these two should be in communication for in the systems current state, a single policy for allowing a `http://localhost:4200` origin with any method is active. Should a third party attempt to make requests to the backend, they would be met with CORS errors.

##### HTTPS Enforcement

HTTPS is enforced for the backend, to ensure the communication between the frontend and backend is encrypted.

#### Access Control

The CredentialsController uses Access Control mechanisms to ensure users are only reading and writing **their own** data, and not someone elses. One of these mechanisms is simply by relying on fetching the user id from the token (which would already be validated at this point), rather than from a route or body.

A seperate policy, *OwnDataPolocy*, was also created to ensure the exact instance of ServiceCredential the user is attempting to either Read, Delete or Update, is actually owned by them.

#### Frontend security

Various methods were used to help secure the frontend. JSON Web Tokens were naturally implemented as a core part of the frontend security, given that this is crucial for communicating with the backend. But the token claims are also validated in the frontend, to help avoid any potentially manipulated token. The application also uses the auth system to protect the `/home` route, where the user can find their stored credentials.

Fetching all the users credentials is of course necesarry to provide them with a list of their data, but only a partial of the data model is recived as passwords are omitted. The full "ServiceCredential" object is recived upon a *Get* for a single ServiceCredential, when the given ServiceCredential is opened. This part is also done through Modals, to avoid any chance of path-traversal to another users credentials.

### Pitfalls and limitation in security

Key handling is a potential weak point, especially when it's stored directly in `appsettings.json`. Ideally, this should be handled by something like HashiCorp Vault, to avoid any exposure during deployments or in source control. The inital plan was to dockerize everything and spin up an instance of HashiCorp vault, but this could not be prioritized.

When it comes to sending decrypted passwords, even though we use HTTPS, it still introduces a risk. We could lean on secret management tools to handle client-side decoding, but this complicates things further. It goes against the zero-trust approach, as exposing decrypted data to the client is a major concern.
