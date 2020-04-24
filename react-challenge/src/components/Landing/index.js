import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Landing = () => (
  <div>
    <Container fluid className='mt-4'>
      <Row>
        <Col><h2 className='text-center'>Welcome!</h2></Col>
      </Row>
    </Container>
  </div>
);

export default Landing;