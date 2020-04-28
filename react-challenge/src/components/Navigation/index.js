import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import * as ROUTES from '../../constants/routes';
import LogOutButton from '../Logout';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <AuthUserContext.Consumer>
    { authUser => authUser ?
        <NavigationAuth /> : 
        <NavigationNonAuth /> 
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div>
    <Container fluid>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href={ ROUTES.HOME }>
          <img alt='' src='logo.png' width='45' height='30' className='d-inline-block align-top'/>
        </Navbar.Brand>

        <Nav className='mr-auto'>
          <Nav.Link className='text-white' href={ ROUTES.HOME }>Home</Nav.Link>
          <Nav.Link className='text-white' href={ ROUTES.ORDERS }>Orders</Nav.Link>
        </Nav>

        <Nav className='justify-content-end'>
          <LogOutButton />
        </Nav>
      </Navbar>
    </Container>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Container fluid>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href={ ROUTES.LANDING }>
          <img alt='' src='logo.png' width='45' height='30' className='d-inline-block align-top'/>
        </Navbar.Brand>

        <Nav className='mr-auto'></Nav>

        <Nav className='justify-content-end'>
          <Nav.Link className='text-white' href={ ROUTES.LOGIN }>Log In</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  </div>
);

export default Navigation;