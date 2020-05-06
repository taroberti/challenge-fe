import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import waitUntil from 'async-wait-until';
import { mount } from 'enzyme';

import { OrdersPage } from './index';

it('should render table with the orders', async () => {
  const order1 = {
    id: '123nmk765',
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

  const order2 = {
    id: '678vsr432',
    order: {
      title: 'Test title 2',
      bookingDate: 0,
      address: {
        street: 'Str 2',
        zip: '1098',
        city: 'Berlin',
        country: 'Germany'
      },
      customer: {
        name: 'Test 2',
        email: 'test2@test.com',
        phone: 76543
      }
    }
  };

  const mockOrders = {orders: [order1, order2]};

  const mockJsonPromise = Promise.resolve(mockOrders);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const root = mount(
    <MemoryRouter>
      <OrdersPage />
    </MemoryRouter>
  );

  // In order to get the OrdersPage needs to get the children from MemoryRouter which is Router,
  // and the children of that which is the OrdersPage.
  const orderPage = root.children().children(); 
  await waitUntil(() => orderPage.state('isLoading') === false);

  const text = orderPage.text();
  mockOrders.orders.forEach(({ order }) => {
    expect(text).toContain('Title');
    expect(text).toContain(order.title);
    expect(text).toContain('Booking Date');
    expect(text).toContain('01.01.1970');
    expect(text).toContain('Address');
    expect(text).toContain(order.address.street);
    expect(text).toContain('Customer');
    expect(text).toContain(order.customer.name);
  });
  
  global.fetch.mockClear();
});