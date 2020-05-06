import React from 'react';
import { render } from '@testing-library/react';

import { EditOrderModal } from './index';

it('should render modal with a form to edit an Order', () => {
  const { getByText } = render(
    <EditOrderModal 
      show={ true }
      handleClose={ () => console.log('close') }
      orderId={ '12345gdfg' }
      title={ 'Testing' }
      bookingDate={ '1970-01-01' }
    />
  );
  
  expect(document.getElementsByClassName("modal-title h4").item(0).textContent).toBe('Edit Order'); // Modal title
  expect(getByText('Title:')).toBeInTheDocument();
  expect(getByText('Booking Date:')).toBeInTheDocument();
  expect(document.querySelectorAll("button")[1].textContent).toBe('Close'); // Close modal button
  expect(document.querySelectorAll("button")[2].textContent).toBe('Edit Order'); // Submit button
});