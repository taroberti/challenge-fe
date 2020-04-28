import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <Container fluid className='mt-4'>
      <Row>
        <Col><h2 className='text-center'>Welcome!</h2></Col>
      </Row>
      <Row>
        <Col><h4 className='text-center'>You are logged in!</h4></Col>
      </Row>
    </Container>
  </div>
);

export default withAuthorization(HomePage);