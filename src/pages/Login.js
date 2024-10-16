import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signinuri =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY';

    fetch(signinuri, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          // console.log(data)
          // const token = data.idToken;
          // const email = data.email;
          // console.log(token);
          // console.log(email)
          dispatch(authActions.login(data));
          alert('You have successfully loggedin');
          navigate('/welcome', { replace: true });
        });
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
  };
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border-3 border-primary border"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-center">LogIn</h2>
                <p className="mb-5 text-center text-muted">
                  Pleases enter your credentials!
                </p>
                <Form className="mb-3" onSubmit={formSubmitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      ref={emailInputRef}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="text-center">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                      ref={passwordInputRef}
                    />
                  </Form.Group>
                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="/">
                        Forgot password?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      LogIn
                    </Button>
                  </div>
                </Form>
                <div>
                  <p className="mb-0 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary fw-bold">
                      SignUp
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
