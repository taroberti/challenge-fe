import React from 'react';
import waitUntil from 'async-wait-until';
import { mount } from 'enzyme';

import { OrderDetailsPage } from './index';

it('should render card with the order details', async () => {
  const mockOrder = {
    order: {
      title: 'Test title',
      bookingDate: 0,
      address: {
        street: 'Str 1',
        zip: '1234',
        city: 'Berlin',
        country: 'Germany'
      },
      customer: {
        name: 'Test',
        email: 'test@test.com',
        phone: 12345
      }
    }
  };

  const mockJsonPromise = Promise.resolve(mockOrder);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const orderParam = { params: { id: '123gth456' } };
  const root = mount(<OrderDetailsPage match={ orderParam } />);
  await waitUntil(() => root.state('isLoading') === false);

  const text = root.text();
  expect(text).toContain('Title');
  expect(text).toContain(mockOrder.order.title);
  expect(text).toContain('Booking Date');
  expect(text).toContain('01.01.1970');
  expect(text).toContain('Address');
  expect(text).toContain(mockOrder.order.address.street);
  expect(text).toContain(`${mockOrder.order.address.city} ${mockOrder.order.address.zip}`);
  expect(text).toContain(mockOrder.order.address.country);
  expect(text).toContain('Customer');
  expect(text).toContain(mockOrder.order.customer.name);
  expect(text).toContain(mockOrder.order.customer.email);
  expect(text).toContain(mockOrder.order.customer.phone);
  expect(text).toContain('Edit Order'); // Button that opens modal
  
  global.fetch.mockClear();
});