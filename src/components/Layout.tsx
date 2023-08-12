import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Cards</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
