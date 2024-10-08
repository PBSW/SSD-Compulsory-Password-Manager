export interface CredentialsCreate {
  serviceName: string;
  serviceUsername: string;
  servicePassword: string;
}

export interface CredentialsUpdate {
  id: number;
  serviceName: string;
  serviceUsername: string;
  servicePassword: string;
}

export interface CredentialsRequest {
  id: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}
