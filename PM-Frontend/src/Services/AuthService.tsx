import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of your AuthService
interface AuthServiceContextType {
    token: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
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

    const login = (username: string, password: string) => {
        // Make request

        let token: string | null = null;
        token = username + ':' + password;
        localStorage.setItem('jwtToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
    };

    return (
        <AuthServiceContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthServiceContext.Provider>
    );
};