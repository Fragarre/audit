import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import homeImage from '../../images/auditHome.jpg'
import Layout from '../../components/Layout'
const Home = () => {
    return (
        <>
            <Layout />
            <Jumbotron>
                <Image src={homeImage} fluid />
            </Jumbotron>);
        </>)
}

export default Home;