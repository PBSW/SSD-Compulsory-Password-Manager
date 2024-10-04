import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {LoginRequest, RegisterCreateRequest} from "../Models/Requests.ts";
import axiosInstance from "./HttpsService.ts";

// Define the shape of your AuthService
interface AuthServiceContextType {
    token: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    register: (email: string, username: string, password: string) => boolean;
}

// Define the props for AuthServiceProvider, including children
interface AuthServiceProviderProps {
    children: ReactNode;
}

// Create the AuthService Context
const AuthServiceContext = createContext<AuthServiceContextType | undefined>(undefined);

// Hook to use the AuthService context
export const useAuthService = (): AuthServiceContextType => {
    const context = useContext(AuthServiceContext);
    if (!context) {
        throw new Error('useAuthService must be used within an AuthServiceProvider');
    }
    return context;
};

// AuthServiceProvider to wrap the app and provide the auth service globally
export const AuthServiceProvider: React.FC<AuthServiceProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (username: string, password: string) => {
        // Make request
        const dto: LoginRequest = {
            username: username,
            password: password,
        }

        const response = await axiosInstance.post('/auth/login', dto);
/*
        // Save the JWT token after successful login
        const token = response.data.token;
        if (token) {
            localStorage.setItem('jwtToken', token);
            setToken(token)
        }
*/

        let token: string | null = null;
        token = username + ':' + password;
        localStorage.setItem('jwtToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
    };

    const register = async (email: string, username: string, password: string): boolean => {

        const dto: RegisterCreateRequest = {
            email: email,
            username: username,
            password: password
        }

        const response = await axiosInstance.post('/auth/register', dto)



        return true;
    }

    return (
        <AuthServiceContext.Provider value={{ token, login, logout, register }}>
            {children}
        </AuthServiceContext.Provider>
    );
};