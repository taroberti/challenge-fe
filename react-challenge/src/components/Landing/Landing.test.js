import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './index';

it('renders welcome message from landing page', () => {
  const { getByText } = render(<LandingPage />);
  expect(getByText('Welcome!')).toBeInTheDocument();
});