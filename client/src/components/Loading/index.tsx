import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './loading.module.css'

interface IAppProps {
  text: string,
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const texto=props.text
  return (
    <>
    <Row>
      <Col />
      <Col xs={6}>
        <Spinner className={styles.centerme} animation="border" role="status" />
      </Col>
      <Col />
    </Row>
    <Row>
      <Col />
      <Col xs={6}>
        <h5>{texto} ...</h5>
      </Col>
      <Col />
    </Row>
  </>
  ) ;
};

export default App;
