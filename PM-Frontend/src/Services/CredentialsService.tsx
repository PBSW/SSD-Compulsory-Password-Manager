import axiosInstance from "./AxiosInstance.ts";
import {CredentialsCreate, CredentialsUpdate} from "../Models/Requests.ts";
import {CredentialsResponse} from "../Models/Responses.ts";


export const useCredentialsService = () => {
    // Create credentials
    const createCredentials = async (data: CredentialsCreate) => {
        return axiosInstance.post<CredentialsResponse>('/credentials/create', data);
    };

    // Get credentials by ID
    const getCredentialsById = async (id: number) => {
        return axiosInstance.get<CredentialsResponse>(`/credentials/get/${id}`);
    };

    // Get all credentials by user ID
    const getAllByUser = async (userId: number) => {
        return axiosInstance.get<CredentialsResponse[]>(`/credentials/getAllByUser/${userId}`);
    };

    // Update credentials
    const updateCredentials = async (data: CredentialsUpdate) => {
        return axiosInstance.put<CredentialsResponse>('/credentials', data);
    };

    // Delete credentials
    const deleteCredentials = async (id: number) => {
        return axiosInstance.delete<boolean>(`/credentials/${id}`);
    };

    return { createCredentials, getCredentialsById, getAllByUser, updateCredentials, deleteCredentials };
};