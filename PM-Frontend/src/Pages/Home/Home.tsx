import React from 'react';
import { Button } from 'react-bootstrap';

interface HomeProps {
    handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout }) => {
    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Home;
