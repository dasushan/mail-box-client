// import { Container, Row, Col, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#f6f8fc',
        height: '100vh',
        width: '100vw',
        overflowY: 'auto',
      }}
    >
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Outlet />
      </div>
      {/* <Container className="p-4">
        <Row className=" d-flex justify-content-center mb-5 shadow ">
          <Col
            className="col-md-8 col-lg-6 col-xs-12"
            style={{ marginTop: '2rem' }}
          >
            <h3 className="fw-2">Welcome to your Mail box</h3>
          </Col>
          <Col className="col-3" style={{ marginTop: '2rem' }}>
            <Button
              onClick={() => {
                navigate('/welcome/email');
              }}
            >
              Compose Email
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Outlet />
      </Container> */}
    </div>
  );
};
export default Welcome;
