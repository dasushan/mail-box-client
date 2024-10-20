import { useRef } from 'react';
import { Row, Container, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const AuthForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   
    // console.log('signup')

    const signupuri = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY'

    fetch(signupuri, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((res) => {
      if(res.ok){
        console.log('User has successfully signedup')
        return res.json().then((data) =>{
           // console.log(data);
          // console.log(data.email)
          dispatch(authActions.login(data))
          alert('You have succesfully signedup')
          navigate('/signin', {replace: true})
        })
      }
      else{
        return res.json().then((data) => {
          let errorMessage = 'Authentication failed!';
          if( data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        })
      }
    })
  }
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border-3 border-primary border"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold  mb-2 text-center">
                  SignUp
                </h2>
                <p className="mb-5 text-center text-muted">
                  Please enter your credentials!
                </p>
                <Form className="mb-3" onSubmit={formSubmitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      required
                      ref={confirmpasswordRef}
                    />
                  </Form.Group>
                  {/* <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="/">
                        Forgot password?
                      </a>
                    </p>
                  </div> */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Signup
                    </Button>
                  </div>
                </Form>
                <div>
                    <p className='mb-0 text-center'>
                         Have an account?{' '}
                        <Link to='/signin' className='text-primary fw-bold'>LogIn</Link>
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

export default AuthForm;
