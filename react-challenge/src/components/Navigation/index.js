import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Login</Link>
      </li>
      <li>
        <Link to={ROUTES.ORDERS}>Orders</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;