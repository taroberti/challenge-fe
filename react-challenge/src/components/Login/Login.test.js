import React from 'react';
import { render } from '@testing-library/react';

import { LogInFormBase } from './index';

it('should render card with a form to log in the user', () => {
  const { getByText } = render(<LogInFormBase />);
  
  expect(getByText('Login')).toBeInTheDocument(); // Card title
  expect(getByText('Email address')).toBeInTheDocument();
  expect(getByText('Password')).toBeInTheDocument();
  expect(document.querySelectorAll("button")[0].textContent).toBe('Log In'); // Submit button
});