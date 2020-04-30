import React, { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const NavigationAuth = props => (
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
          <Nav.Link className='text-white' href={ ROUTES.LOGIN } onClick={ props.onLogOutClick }>Log Out</Nav.Link>
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

class Navigation extends Component {

  onLogOutClick = () => this.props.firebase.doSignOut();

  render() {
    return (
      <AuthUserContext.Consumer>
        { authUser => authUser ?
            <NavigationAuth onLogOutClick={ this.onLogOutClick }/> : 
            <NavigationNonAuth /> 
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Navigation);