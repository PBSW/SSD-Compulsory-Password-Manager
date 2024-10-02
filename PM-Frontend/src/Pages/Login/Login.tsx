import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import {useAuthService} from "../../Services/AuthService.tsx";


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { login } = useAuthService(); // Use the AuthService



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            login(username, password); // Call the login function from AuthService

            //Navigate
            navigate("/");

        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.log(err);
        }
    };

    return (
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>

        </Container>
    );
};

export default Login;