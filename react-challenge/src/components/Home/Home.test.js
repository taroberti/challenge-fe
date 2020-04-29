import React from 'react';
import { render } from '@testing-library/react';

import { HomePage } from './index';

it('renders welcome message from home page', () => {
  const { getByText } = render(<HomePage />);
  expect(getByText('Welcome!')).toBeInTheDocument();
  expect(getByText('You are logged in!')).toBeInTheDocument();
});