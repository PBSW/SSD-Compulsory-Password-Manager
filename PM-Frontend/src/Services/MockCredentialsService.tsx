// src/Services/MockCredentialsService.ts
import { CredentialsCreate, CredentialsUpdate } from '../Models/Requests.ts';
import { CredentialsResponse } from '../Models/Responses.ts';

export const useMockCredentialsService = () => {
    const mockCredentials: CredentialsResponse[] = [
        {
            id: 1,
            serviceName: 'Google',
            serviceUsername: 'user1@gmail.com',
            servicePassword: 'password123',
        },
        {
            id: 2,
            serviceName: 'Facebook',
            serviceUsername: 'user2@facebook.com',
            servicePassword: 'password456',
        },
        {
            id: 3,
            serviceName: 'Twitter',
            serviceUsername: 'user3@twitter.com',
            servicePassword: 'password789',
        },
    ];

    // Mock create credentials
    const createCredentials = async (data: CredentialsCreate): Promise<CredentialsResponse> => {
        const newCredential: CredentialsResponse = {
            id: mockCredentials.length + 1,
            serviceName: data.serviceName,
            serviceUsername: data.serviceUsername,
            servicePassword: data.servicePassword,
        };
        mockCredentials.push(newCredential);
        return Promise.resolve(newCredential);
    };

    // Mock get credentials by ID
    const getCredentialsById = async (id: number): Promise<CredentialsResponse | null> => {
        const credential = mockCredentials.find((cred) => cred.id === id);
        return Promise.resolve(credential || null);
    };

    // Mock get all credentials by user ID
    const getAllByUser = async (userId: number): Promise<CredentialsResponse[]> => {
        // Return all credentials for simplicity, but you could mock user-specific logic here
        return Promise.resolve(mockCredentials);
    };

    // Mock update credentials
    const updateCredentials = async (data: CredentialsUpdate): Promise<CredentialsResponse | null> => {
        const index = mockCredentials.findIndex((cred) => cred.id === data.id);
        if (index > -1) {
            mockCredentials[index] = { ...mockCredentials[index], ...data };
            return Promise.resolve(mockCredentials[index]);
        }
        return Promise.resolve(null);
    };

    // Mock delete credentials
    const deleteCredentials = async (id: number): Promise<boolean> => {
        const index = mockCredentials.findIndex((cred) => cred.id === id);
        if (index > -1) {
            mockCredentials.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };

    return { createCredentials, getCredentialsById, getAllByUser, updateCredentials, deleteCredentials };
};
