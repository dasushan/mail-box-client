import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container>
      <Row className=" d-flex justify-content-center ">
        <Col className='col-md-8 col-lg-6 col-xs-12' style={{marginTop: '5rem'}}>
         <h2 className='fw-2'>Welcome to your Mail box</h2>
        </Col>
      </Row>
    </Container>
  );
};
export default Welcome;
