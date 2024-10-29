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
      - [Backend Security](#backend-security)
        - [Key handling](#key-handling)
        - [Encryption](#encryption)
        - [Password Hashing and Salting](#password-hashing-and-salting)
        - [JWTs (JSON Web Tokens)](#jwts-json-web-tokens)
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
5. Run the backend with `ng serve`.

The frontend should now be available at `http://localhost:4200`

## Screenshots

![alt text](<Screenshot 2024-10-10 182656.png>)
![alt text](<Screenshot 2024-10-10 182630.png>)
![alt text](<Screenshot 2024-10-10 182635.png>)
![alt text](<Screenshot 2024-10-10 182645.png>)

## Security Model discussion

### What are we protecting against?

The threat model is focused on protecting against external attackers, and data breaches. 
External attackers might use brute-force attacks or exploit vulnerabilities to gain unauthorized access. Brute force attacks are made expensive by using a strong hashing algorithm, specifically, Argon2id. 
Insider threats are also mostly mitigated through strong encryption of sensitive data using AES-GCM-256 on the client-side. This ensures that even if someone within the organization gains access to the database, the stored data remains encrypted and unreadable. The key is completely unknown by the server, and only reproducable with the exact cleartext master password and username. 

The primary weakpoint in the system, allowing the encrypted password to be decrypted by a threat actor, would be to extract the pre-hashed password from the servers memory and use it in a rainbow-table. Afterwhich, they would need access to the database, which is not particularly hard given that a SQLite database is used in this implementation. Finding this specific users master username, they would be able to recreate the users encryption key. Splicing the cipher text and IV from the encrypted credential-password, they would then be able to decrypt it themselves. This would only compromise a single user, and a such, the implementation is also reasonably safe against insider threats, although not perfectly so.

By combining these mechanisms, we safeguard user passwords and sensitive information against potential breaches.

### Security Model

#### Backend Security

##### Key handling

Current State: Currently, the encryption keys and secrets are stored directly in the appsettings.json file. While this is convenient for development, it poses a significant security risk in a production environment. Anyone with access to the source code or deployment package could potentially extract the key and compromise the application's security.

Orignally we had planned to use HarhiCorp Vault but due to time constraints it was scrapped.

Recommended Solution: To handle this securely in a production environment:

- Use a Secrets Manager: We plan to use tools like HashiCorp Vault or Azure Key Vault to manage sensitive keys securely. This approach keeps the keys outside of the application codebase and makes it much harder for an attacker to gain access to these secrets.
- Environment Variables: For simpler deployments, secrets could be passed through environment variables that are only accessible to the runtime environment.

##### Encryption

To protect sensitive data at rest, AES-GCM-256 is used to handle password encryption in the app. All encryption is handled client side with unique key derived via PBKDF2 from the users password, salted with their username to avoid rainbow table attacks. Using a unique key per user versus using a singular encryption key in the backend is intended to avoid a single point of failure. If the singular key is exposed by either an outsider- or insider threat, the entire userbase's credentials would be compromised. The derived user key replicable only by the user, as it is salted with a unique username. Of course, that is if they utilize strong and unique master credentials for the password manager. The key is stored in session storage, to avoid persisting it for longer than necesarry.

A random IV is generated when encrypting a password, which is stored in the same string as the cipher. When decrypting a password, the cipher text and IV are seperated, and subsequently decrypted with the users key. 

##### Password Hashing and Salting

Password hashing is essential to ensure that even if an attacker gains access to the database, they cannot easily retrieve user passwords. Our implementation utilizes Argon2id, which is currently among the strongest hashing algorithms available.

Each password is combined with a unique salt value before being hashed. The salt is a random string that is stored alongside the hashed password in the database. The purpose of the salt is to ensure that identical passwords result in different hash values, thereby protecting against rainbow table attacks and making it significantly harder for attackers to crack passwords using precomputed hashes.

However, the password being hashed in the backend is not the plaintext password. Before sending the password to backend, the frontend will do a quick SHA-256 hash on the password to avoid cleartext traffic of the master password, which could be extracted from memory by threat actors. This hash is however vulnerable to rainbow-table attacks, as it is not salted. Still, it does make the attack vector less likely.

For our implementation:

- Frontend hashing: The password goes through an unsalted SHA-256 hash. 
- Salt Generation: A unique salt is generated for each password when it is created or changed.
- Hashing: The salted password is hashed using the Argon2id algorithm with a high number of iterations, which makes brute-force attacks computationally expensive.
- Storing: Only the salt and the hashed password are stored in the database, and not the plaintext password itself.

##### JWTs (JSON Web Tokens)

JWTs are used to handle authentication in our application. When a user logs in, a JWT is generated and signed using a secret key. This token is then sent to the client, which stores it for subsequent API requests. The client includes this token in the Authorization header of each request to authenticate itself with the backend.

Key features of JWT implementation:

- Signature Verification: Each token is signed using a secure algorithm (HMAC SHA-256) to ensure its integrity. The backend verifies this signature to prevent tampering.
- Expiration: Tokens have a defined expiration time to limit their lifetime and reduce the risk of misuse. Ideally the lifetime would be short, with a refresher, but for simplicity sake it is currently eight hours.
- Claims: The token contains claims such as the user's ID, name, and roles to identify the user without repeatedly querying the database.

By using JWTs, we ensure that sensitive information is not included in requests and responses, minimizing the chances of a data leak.

##### CORS Configuration

As this is a distributed system, CORS must be configured in order for the frontend and backend to communicate. Since only these two should be in communication for in the systems current state, a single policy for allowing a `http://localhost:4200` origin with any method is active. Should a third party attempt to make requests to the backend, they would be met with CORS errors.

##### HTTPS Enforcement

HTTPS is enforced for the backend, to ensure the communication between the frontend and backend is encrypted.

#### Access Control

The CredentialsController uses Access Control mechanisms to ensure users are only reading and writing **their own** data, and not someone elses. One of these mechanisms is simply by relying on fetching the user id from the token (which would already be validated at this point), rather than from a route or body.

A seperate policy, *OwnDataPolocy*, was also created to ensure the exact instance of ServiceCredential the user is attempting to either Read, Delete or Update, is actually owned by them.

Pitfalls and Limitations in Security

Despite our best efforts to secure the application, certain limitations and potential pitfalls exist that should be acknowledged:

- Key Exposure: Currently, the key handling is a weak point since keys are stored in plain text in the appsettings.json file. This exposes the key to anyone with access to the codebase, making it a target for attackers. A secret management solution is highly recommended for production use.

- Decrypted Password Transmission: Sending decrypted passwords from the backend to the client, even over HTTPS, introduces a potential risk. If the HTTPS connection is compromised or if the client device itself is insecure, this information could be intercepted. Ideally, decryption should happen only when absolutely necessary and in a controlled environment.

- Cross-Site Scripting (XSS) Risks: As with any web-based frontend, there is a risk of XSS attacks. Proper validation, encoding, and sanitization of user input in the frontend is crucial to prevent these attacks.

- Token-based Security Limitations: While JWTs provide a convenient mechanism for stateless authentication, they also have some limitations:
If a token is compromised, it can be used until it expires. Implementing token revocation or short-lived tokens with refresh tokens could mitigate this issue.
Token storage on the client side should be secured to prevent theft. It's recommended to use secure, HTTP-only cookies or secure storage mechanisms.

- Lack of Rate Limiting: To protect against brute-force attacks, rate limiting should be applied to login endpoints and sensitive operations. Currently, this is not explicitly implemented but is recommended for production use.

- No Client-side Encryption: Sensitive information like passwords is decrypted on the server-side and transmitted to the client as plaintext. Ideally, implementing end-to-end encryption with client-side decryption would minimize the risk of data exposure. However, this complicates the architecture and increases the reliance on secure client storage.

#### Frontend security

Various methods were used to help secure the frontend. JSON Web Tokens were naturally implemented as a core part of the frontend security, given that this is crucial for communicating with the backend. But the token claims are also validated in the frontend, to help avoid any potentially manipulated token. The application also uses the auth system to protect the `/home` route, where the user can find their stored credentials. It is at this point only, that the password of a users credential is decrypted.

Fetching all the users credentials is of course necesarry to provide them with a list of their data, but only a partial of the data model is recived as passwords are omitted. The full "ServiceCredential" object is recived upon a *Get* for a single ServiceCredential, when the given ServiceCredential is opened. This part is also done through Modals, to avoid any chance of path-traversal to another users credentials.

### Pitfalls and limitation in security

Ideally, the system should also require stronger master passwords for the password vault, as well a 2-factor authentication.

As mentioned elsewhere, the pre-hashed password in the frontend should ideally have been salted in some manner, and perhaps even have utilized a stronger encryption algorithm such a Bcrypt.

Although the solution is completely dockerized, it still uilizes a SQLite database, which is suboptimal for security as it provides no access-control mechanisms. While perfectly fine for development environments, an SQL Server instance should be spun up with non-default credentials to further reduce the risk of insider threats.

There are still limits as to what can be protected against. In a situation wherein a user's PC has already been infiltrated by a malicous actor, this actor would be able to retrieve the users key for themselves if a session is active, or even just extract their master login credentials with a KeyLogger.