import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
import LoginPage from '../Login';

import { withAuthentication  } from '../Session';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />

      <Route exact path={ ROUTES.LANDING } component={ LandingPage } />
      <Route exact path={ ROUTES.HOME } component={ HomePage } />
      <Route exact path={ ROUTES.LOGIN } component={ LoginPage } />
    </div>
  </BrowserRouter>
);

export default withAuthentication(App);