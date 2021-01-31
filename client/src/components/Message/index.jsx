import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import styles from './message.module.css'

const Message = (props) => {
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    const {className, header, body} = props.params
    return (
        <Row>
            <Col md={4} />
            {className === 'error' ? (
                 <Col md={4}>
                 <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                     <Toast.Header className = {styles.error}>
                         <strong className="mr-auto">{header}</strong>
                     </Toast.Header>
                     <Toast.Body>{body}</Toast.Body>
                 </Toast>
             </Col>
            ) : null}
            {className === 'warn' ? (
                 <Col md={4}>
                 <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                     <Toast.Header className = {styles.warn}>
                         <strong className="mr-auto">{header}</strong>
                     </Toast.Header>
                     <Toast.Body>{body}</Toast.Body>
                 </Toast>
             </Col>
            ) : null}
             {className === 'info' ? (
                 <Col md={4}>
                 <Toast show={showA} onClose={toggleShowA} delay={3000} autohide>
                     <Toast.Header className = {styles.info}>
                         <strong className="mr-auto">{header}</strong>
                     </Toast.Header>
                     <Toast.Body>{body}</Toast.Body>
                 </Toast>
             </Col>
            ) : null}
            <Col md={4} />
        </Row>
    );
}

export default Message;
