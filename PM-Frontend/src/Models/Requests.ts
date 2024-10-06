export interface RegisterCreateRequest {
    email: string;
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

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
