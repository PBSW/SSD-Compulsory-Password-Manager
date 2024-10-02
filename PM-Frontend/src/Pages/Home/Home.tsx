import React from 'react';
import { Button } from 'react-bootstrap';
import {useAuthService} from "../../Services/AuthService.tsx";
import {useNavigate} from "react-router-dom";



const Home: React.FC = () => {

    const { logout } = useAuthService(); // Use the AuthService
    const navigate = useNavigate();

    const handleLogout = async () => {


        try {
            logout(); // Call the login function from AuthService

            //Navigate
            navigate("/");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <Button variant="danger" onClick={() => handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Home;
