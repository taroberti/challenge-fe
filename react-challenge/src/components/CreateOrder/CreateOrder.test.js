import React from 'react';
import { render } from '@testing-library/react';

import { CreateOrderModal } from './index';

it('should render modal with a form to create a new Order', () => {
  const { getByText } = render(<CreateOrderModal show={ true } handleClose={ () => console.log('close') } />);
  
  expect(getByText('Create new Order')).toBeInTheDocument(); // Modal title
  expect(getByText('Title:')).toBeInTheDocument();
  expect(getByText('Booking Date:')).toBeInTheDocument();
  expect(getByText('Address')).toBeInTheDocument(); // Address sub division
  expect(getByText('Street:')).toBeInTheDocument();
  expect(getByText('Zip:')).toBeInTheDocument();
  expect(getByText('City:')).toBeInTheDocument();
  expect(getByText('Country:')).toBeInTheDocument();
  expect(getByText('Customer')).toBeInTheDocument(); // Customer sub division
  expect(getByText('Name:')).toBeInTheDocument();
  expect(getByText('Email:')).toBeInTheDocument();
  expect(getByText('Phone:')).toBeInTheDocument();
  expect(document.querySelectorAll("button")[1].textContent).toBe('Close'); // Close modal button
  expect(document.querySelectorAll("button")[2].textContent).toBe('Create Order'); // Submit button
});