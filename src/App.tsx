import React from 'react';
import {
  Box,
  ChakraBaseProvider,
  extendBaseTheme,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, People, NotFound } from './pages';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Box,
    Skeleton,
    SkeletonText,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <People />,
      },
      {
        path: ':personId',
        element: <Person />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export const App = () => (
  <ChakraBaseProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraBaseProvider>
);
