import React from 'react';
import { render } from '@testing-library/react';

import { NavigationAuth, NavigationNonAuth } from './index';
import * as ROUTES from '../../constants/routes';

it('should render non auth navbar when user is not logged in', () => {
  render(<NavigationNonAuth />);
  expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe(ROUTES.LANDING);
  expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe(ROUTES.LOGIN);
});

/* Does not work because has a component that uses withRouter

it('should render auth navbar when user is logged in', () => {
  render(<NavigationAuth />);
  expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe(ROUTES.HOME);
  expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe(ROUTES.HOME);
  expect(document.querySelectorAll("a")[2].getAttribute("href")).toBe(ROUTES.ORDERS);
});
*/