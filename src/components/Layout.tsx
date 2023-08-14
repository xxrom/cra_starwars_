import React, { memo } from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
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
      fontSize="lg"
    >
      <SimpleGrid
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        spacing="16px"
      >
        <Text
          textDecoration="underline"
          py="1"
          px="3"
          cursor="pointer"
          borderColor="gray.400"
        >
          <Link to="/">StarWars</Link>
        </Text>

        <Text
          textDecoration="underline"
          py="1"
          px="3"
          cursor="pointer"
          borderColor="gray.400"
        >
          <Link to="/about">About</Link>
        </Text>
      </SimpleGrid>
    </Box>

    <Box width="100%" maxWidth="960px" padding="6">
      <Outlet />
    </Box>

    <Box
      width="100%"
      maxHeight="100px"
      borderTop="1px"
      borderColor="gray.300"
      padding="6"
    >
      <SimpleGrid
        display="flex"
        justifyContent="flex-end"
        flexWrap="wrap"
        spacing="16px"
      >
        <Text textDecoration="underline">
          <Link to="https://github.com/xxrom/cra_starwars_">
            ChernyshovNikita - GitHub
          </Link>
        </Text>

        <Text textDecoration="underline">
          <Link to="https://chernyshov-cra-starwars.netlify.app/">
            Cloud Link
          </Link>
        </Text>
      </SimpleGrid>
    </Box>
  </Box>
));
