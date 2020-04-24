import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={ ROUTES.LANDING }>
          <img alt="" src="logo.png" width="45" height="30" className="d-inline-block align-top"/>
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href={ ROUTES.LANDING }>Home</Nav.Link>
          <Nav.Link href={ ROUTES.ORDERS }>Orders</Nav.Link>
        </Nav>

        <Nav className="justify-content-end">
          <Nav.Link href={ ROUTES.LOGIN }>Login</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  </div>
);

export default Navigation;