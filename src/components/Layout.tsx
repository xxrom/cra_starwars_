import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = memo(() => (
  <Box padding={6}>
    -----------
    <nav>
      <ul>
        <li>
          <Link to="/">Cards</Link>
        </li>
      </ul>
    </nav>
    -----------
    <Outlet />
  </Box>
));
