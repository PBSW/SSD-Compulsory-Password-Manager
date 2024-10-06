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