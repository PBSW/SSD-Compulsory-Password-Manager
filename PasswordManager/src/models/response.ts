export interface LoginResponse {
  id: number;
  email: string;
  username: string;
}

export interface CredentialsResponse {
  id: number;
  serviceName: string;
  serviceUsername: string;
  servicePassword: string;
}


export const emptyCredentialsResponse: CredentialsResponse = {
  id: 0,
  serviceName: '',
  serviceUsername: '',
  servicePassword: ''
}


export interface TokenResponse {
  token: string;
}
