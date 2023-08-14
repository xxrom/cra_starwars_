import React, { memo } from 'react';
import { Box, Link as MenuLink } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = memo(() => (
  <Box
    display="flex"
    flexDirection="column"
    minHeight="100vh"
    alignItems="center"
    justifyContent="space-between"
    overflow="hidden"
  >
    <Box
      display="flex"
      width="100%"
      justifyContent="center"
      padding="6"
      boxShadow="lg"
    >
      <MenuLink
        borderBottom="1px"
        py="1"
        px="3"
        cursor="pointer"
        borderColor="gray.400"
      >
        <Link to="/">Main page</Link>
      </MenuLink>
    </Box>

    <Box width="100%" maxWidth="960px" padding="6">
      <Outlet />
    </Box>

    <Box width="100%" maxHeight="100px" backgroundColor="gray.100" padding="6">
      <Link to="https://github.com/xxrom/cra_starwars_">
        ChernyshovNikita - GitHub
      </Link>
    </Box>
  </Box>
));
