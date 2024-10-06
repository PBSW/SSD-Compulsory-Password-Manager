// src/Services/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL of your backend
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Timeout after 10 seconds
});

// Add a request interceptor to include authentication token if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken'); // Get token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors globally if needed
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors (e.g., 401, 403, etc.)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Redirect to login or handle token expiration logic
            console.error('Unauthorized or Forbidden. Redirecting to login...');
            localStorage.removeItem('jwtToken');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
