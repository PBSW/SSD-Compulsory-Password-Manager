import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Container} from 'react-bootstrap';
import {useAuthService} from "../../Services/AuthService.tsx";
import {useNavigate} from "react-router-dom";
//import {useCredentialsService} from "../../Services/CredentialsService.tsx";
import {useMockCredentialsService} from "../../Services/MockCredentialsService.tsx";
import {CredentialsResponse} from "../../Models/Responses.ts";

const Home: React.FC = () => {

    const { logout, getCurrentUser } = useAuthService(); // Use the AuthService
    const navigate = useNavigate();
    const { getAllByUser } = useMockCredentialsService();
    const [credentials, setCredentials] = useState<CredentialsResponse[]>([]);


    const handleLogout = async () => {
        try {
            logout(); // Call the login function from AuthService

            //Navigate
            navigate("/");

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Fetch all credentials for the user on component load
        const fetchCredentials = async () => {
            try {
                const currentUser = await getCurrentUser();

                const response = await getAllByUser(currentUser.id);
                //setCredentials(response);
            } catch (error) {
                console.error('Error fetching credentials', error);
            }
        };

        fetchCredentials();
    }, [getAllByUser, getCurrentUser]);


    return (
        <div>
            <Container className="mt-5">
                <h2 className="mb-4">Your Credentials Vault</h2>
                <Button variant="danger" className="mb-4" onClick={handleLogout}>
                    Logout
                </Button>

                <Accordion>
                    {credentials.map((credential, index) => (
                        <Card key={credential.id}>
                            <Accordion.Item eventKey={String(index)}>
                                <Accordion.Header>
                                    {credential.serviceName}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p><strong>Username:</strong> {credential.serviceUsername}</p>
                                    <p><strong>Password:</strong> {credential.servicePassword}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Card>
                    ))}
                </Accordion>
            </Container>
        </div>

    );
};

export default Home;
