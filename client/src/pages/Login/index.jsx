import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Message from '../../components/Message';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './login.module.css';
import { useMutation, gql } from '@apollo/client';

const USER_TOKEN = gql`
    mutation 
    autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input)
    }
`;

const Login = () => {
    const [autenticarUsuario] = useMutation(USER_TOKEN)
    const [userData, setUserData] = useState({
        user: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(false)
    const errorToDisplay = {
        className: 'error',
        header: 'Error!',
        body: 'Wrong user or password'
    }
    const handleInputChange = e => {
        e.preventDefault()
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage(false);
        const { user, password } = userData;
        try {
            const result = await autenticarUsuario({
                variables: {
                    input: {
                        user,
                        password
                    }
                }
            })
            const token = result.data.autenticarUsuario;
            localStorage.setItem('token', token)
            history.push('/home');
        } catch (error) {
            setErrorMessage(true)
        }
    }
    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Audit activities & Invoicing</Navbar.Brand>
            </Navbar>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2 className="text-center">
                    Login
                </h2>
                <h6 className="text-center">
                    Enter User and Password
                </h6>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="user"
                        placeholder="User"
                        value={userData.name}
                        onChange={handleInputChange}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.name}
                        onChange={handleInputChange}>
                    </Form.Control>
                </Form.Group>
                <Button variant="secondary" type='submit' className="btn-lg btn-dark btn-block">Login</Button>
            </form>
            {errorMessage ? (
                <Message params= {errorToDisplay} />) : null}
        </>
    );
}


export default Login;