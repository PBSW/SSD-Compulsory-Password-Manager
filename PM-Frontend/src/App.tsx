import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Login from './Pages/Login/Login.tsx'; // Separate login component
import Home from './Pages/Home/Home.tsx'; // Home page component (to be protected)
import {AuthServiceProvider, useAuthService} from './Services/AuthService.tsx';
import Register from "./Pages/Register/Register.tsx";

// PrivateRoute Component
const PrivateRoute: React.FC = () => {
    const { token } = useAuthService(); // Use the AuthService to check auth state
    let isAuthenticated = false;

    isAuthenticated = token === null
    //TODO: Verify Token here


    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <AuthServiceProvider>
            <Router>
                <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
                    <Routes>
                        {/* Public Route */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                        </Route>

                        {/* Redirect unknown routes to login */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Container>
            </Router>
        </AuthServiceProvider>
    );
};




export default App;