import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuthService } from '../../Services/AuthService.tsx';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { register } = useAuthService(); // Use the AuthService for registration

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.length < 20) {
            setError("Username is too long. Max 20 characters.");
            return;
        }

        if (username.length > 4) {
            setError("Username is too short. Minimum 4 characters.");
            return;
        }

        if (!username.match("\"^[a-zA-Z0-9]*$\"")) {
            setError("Username contains invalid characters.");
            return;
        }

        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setError("Email is invalid.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const result = await register(email, username, password); // Call the register function from AuthService

            if (result) {
                setSuccess(true);
                setError(null);

                // Redirect to login page after successful registration
                setTimeout(() => navigate('/login'), 2000);
            }
            else {
                setError("Could not register.")
            }

        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
            <h2>Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
            <Form onSubmit={handleRegister}>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formUsername" className="mt-3">
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

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Register
                </Button>
            </Form>

            <p className="mt-3">
                Already have an account?{' '}
                <Button variant="link" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </p>
        </Container>
    );
};

export default Register;
