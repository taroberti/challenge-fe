import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
import LoginPage from '../Login';
import OrdersPage from '../Orders';
import OrderDetailsPage from '../OrderDetails';

import { withAuthentication  } from '../Session';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />

      <Route exact path={ ROUTES.LANDING } component={ LandingPage } />
      <Route exact path={ ROUTES.HOME } component={ HomePage } />
      <Route exact path={ ROUTES.LOGIN } component={ LoginPage } />
      <Route exact path={ ROUTES.ORDERS } component={ OrdersPage } />
      <Route exact path={ ROUTES.ORDER_DETAILS } component={ OrderDetailsPage } />
    </div>
  </BrowserRouter>
);

export default withAuthentication(App);