# SSD Compulsory Assignment/Mini-Project

This repository is a for a password manager built for Secure Software Development[per the assignment.](https://rpede.github.io/SecureSoftwareDevelopment/assignments/mini-project)
The project was built by [Rasmus](https://github.com/sandbxk) and [Philip](https://github.com/philezad).

While the project was only made by two people, considerations for the 3- and 4-persons goals were still made. The distributed systems model was specfically made to provide a way for cross-device access to crendentials, given that the backend would be hosted in a production environment, and thus (with a bit of tweaking), be made available for a frontend/app targeting a different platform. Arguably, cross-device access would already be feasible if the system was deployed, as the Angular frontend would be accessible on almost anything with a web browser.

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

(encryption, key handling etc.),
Hashing (argon2id),
Tokens,
Cors config.
access control,
HTTPS

Frontend security
(token validation and less-forgiving auth system),
(only fetch password when fetching a specific ServiceCredential, not on a 'getAll').

### Pitfalls and limitation in security

Key handling.
Sending decrypted passwords. Even if over HTTPS. Maybe using a Vault for secret management to enable client-side decoding. Although this would also be troublesome given that there should be zero-trust to the client.
