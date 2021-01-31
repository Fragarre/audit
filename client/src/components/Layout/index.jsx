import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Message from '../Message'
import jwt from 'jsonwebtoken';
import Login from '../../pages/Login'
require("dotenv").config({
    path: "variables.",
});
const Layout = () => {
    const [logged, setLogged] = useState(false)
    const history = useHistory()
    const handleLogout = () => {
        setLogged(false)
        history.push("/");
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        try {
            setLogged(false)
            // eslint-disable-next-line
            const userLogged = jwt.verify(token, "palabraSecreta");
            setLogged(true)
        } catch (error) {
            const errorToMessage = { className: 'error', header: 'Error! ', body: error.message }
            return <Message params={errorToMessage} />
        }
    }, [])

    return (
        <>
            {logged ? (
                <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Audit activities & Invoicing</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Scheduling" id="first-nav-dropdown">
                                <NavDropdown.Item href="schedule" className="ml-auto">Schedule</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="forecast">Forecast</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Config" id="thirs-nav-dropdown">
                                <NavDropdown.Item href="customers" className="ml-auto">Customers</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="auxclients" className="ml-auto">End Clients</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Text 
                        pullright="true"
                        style = {{cursor: 'pointer'}}
                        onClick = {handleLogout}>Log Out </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>) : <Login />}
        </>)
}

export default Layout;