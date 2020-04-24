import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './index.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  formChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit = event => {
    console.log('submit');
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Container fluid className='mt-4'>
          <Row>
            <Col>
              <Card className='card-login'>
                <Card.Header>Login</Card.Header>
    
                <Card.Body>
                  <Form>
                    <Form.Group controlId='formEmail'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type='email' name='email' placeholder='Enter email' value={ email } onChange={ this.formChange }/>
                    </Form.Group>
    
                    <Form.Group controlId='formPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' name='password' placeholder='Enter Password' value={ password } onChange={ this.formChange }/>
                    </Form.Group>
    
                    <Button variant='primary' type='submit' onClick={ this.onFormSubmit } className='bg-dark'>
                      Submit
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

export default Login;