import React, { memo } from 'react';
import { Box, Link as MenuLink } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = memo(() => (
  <Box display="flex" flexDirection="column" alignItems="center" padding={6}>
    <MenuLink
      borderBottom="1px"
      py="1"
      px="3"
      cursor="pointer"
      borderColor="gray.400"
    >
      <Link to="/">Main page</Link>
    </MenuLink>

    <Box width="100%" maxWidth="960px">
      <Outlet />
    </Box>
  </Box>
));
