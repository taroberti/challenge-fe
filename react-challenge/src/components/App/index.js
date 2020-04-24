import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import LandingPage from '../Landing';

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
    </div>
  </BrowserRouter>
);

export default App;