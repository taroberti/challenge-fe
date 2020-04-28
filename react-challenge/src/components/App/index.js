import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
import LoginPage from '../Login';

import { withFirebase } from '../Firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? 
        this.setState({ authUser }) :
        this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    
    return (
      <BrowserRouter>
        <div>
          <Navigation authUser={ authUser }/>

          <Route exact path={ ROUTES.LANDING } component={ LandingPage } />
          <Route exact path={ ROUTES.HOME } component={ HomePage } />
          <Route exact path={ ROUTES.LOGIN } component={ LoginPage } />
        </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);