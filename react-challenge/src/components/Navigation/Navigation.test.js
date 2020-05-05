import React from 'react';
import { render } from '@testing-library/react';

import { AuthUserContext } from '../Session';
import Navigation from './index';
import * as ROUTES from '../../constants/routes';

const firebase = 'firebase';
const authenticated = (Component, props) => {
  return render(
    <AuthUserContext.Provider value={ 'authUser' }>
        <Component {...props} />
    </AuthUserContext.Provider>
  );
};

const nonAuthenticated = (Component, props) => {
  return render(
    <AuthUserContext.Provider value={ null }>
        <Component {...props} />
    </AuthUserContext.Provider>
  );
};

it('should render non auth navbar when user is not logged in', () => {
  nonAuthenticated(Navigation, firebase);
  
  expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe(ROUTES.LANDING);
  expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe(ROUTES.LOGIN); 
});

it('should render auth navbar when user is logged in', () => {
  authenticated(Navigation, firebase);

  expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe(ROUTES.HOME);
  expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe(ROUTES.HOME);
  expect(document.querySelectorAll("a")[2].getAttribute("href")).toBe(ROUTES.ORDERS);
  expect(document.querySelectorAll("a")[3].getAttribute("href")).toBe(ROUTES.LOGIN);
});