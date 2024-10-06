import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest, RegisterCreateRequest } from "../Models/Requests.ts";
import axiosInstance from "./AxiosInstance.ts";
import { LoginResponse } from "../Models/Responses.ts";

// Define the shape of your AuthService
interface AuthServiceContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (email: string, username: string, password: string) => Promise<boolean>;
    getCurrentUser: () => Promise<LoginResponse | null>;
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

    // On component mount, retrieve token from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Login function that sends credentials to the backend
    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const dto: LoginRequest = { username, password };
            //const response = await axiosInstance.post('/auth/login', dto);

            // Assuming token is in response data (this might need adjustment based on actual API response)
            //const token = response.data.token;
            const token = username + ":" + password;

            if (token) {
                localStorage.setItem('jwtToken', token);
                setToken(token);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    // Logout function clears token
    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
    };

    // Register function
    const register = async (email: string, username: string, password: string): Promise<boolean> => {
        try {
            const dto: RegisterCreateRequest = { email, username, password };
            //await axiosInstance.post('/auth/register', dto);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            return false;
        }
    };

    // Get current user based on token (this is just a placeholder)
    const getCurrentUser = async (): Promise<LoginResponse | null> => {
        try {
            if (!token) {
                return null;
            }

            // Example of decoding or fetching user data from the token or API
            // Here you might want to decode the token or fetch the user profile
            return { email: "test@example.com", username: "testUser", id: 1 };
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    };

    return (
        <AuthServiceContext.Provider value={{ token, login, logout, register, getCurrentUser }}>
            {children}
        </AuthServiceContext.Provider>
    );
};
