import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Login from './Pages/Login/Login.tsx'; // Separate login component
import Home from './Pages/Home/home.tsx'; // Home page component (to be protected)

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    // Check if the user is already logged in on app load
    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
    };

    return (
            <Router>
                <Container fluid className="mt-5 w-100 h-100">
                    <Routes>
                        {/* Public Route */}
                        <Route path="/login" element={<Login setToken={setToken}/>}/>

                        {/* Protected Routes */}
                        <Route path="/" element={<PrivateRoute token={token}/>}>
                            <Route path="/" element={<Home handleLogout={handleLogout}/>}/>
                        </Route>

                        {/* Redirect any unknown routes to login */}
                        <Route path="*" element={<Navigate to="/login" replace/>}/>
                    </Routes>
                </Container>
            </Router>
    );
};

// PrivateRoute Component to protect authenticated routes
const PrivateRoute: React.FC<{ token: string | null }> = ({token}) => {
    return token ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default App;