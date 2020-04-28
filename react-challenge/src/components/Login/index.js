import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import './index.css';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const LogInPage = () => (
  <div>
    <LogInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LogInFormBase extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignIn(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });

        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <Container fluid className='mt-4'>
          <Row>
            <Col>
              {
                error ? (
                <Alert className='alert-login mb-2' variant='danger'>
                  { error.message }
                </Alert>) : null
              }
              <Card className='card-login border-dark'>
                <Card.Header>Login</Card.Header>
    
                <Card.Body>
                  <Form>
                    <Form.Group controlId='formEmail'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type='email' name='email' placeholder='Enter email' value={ email } onChange={ this.onFormChange }/>
                    </Form.Group>
    
                    <Form.Group controlId='formPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' name='password' placeholder='Enter Password' value={ password } onChange={ this.onFormChange }/>
                    </Form.Group>
    
                    <Button block variant='dark' type='submit' onClick={ this.onFormSubmit } disabled={ isInvalid }>
                      Log In
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const LogInForm = withRouter(withFirebase(LogInFormBase));

export default LogInPage;