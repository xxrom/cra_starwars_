import React from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
//import { Layout } from './components';
import { Card, Cards, NotFound } from './pages';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

//<Route path="/" element={<Layout />}>
const router = createBrowserRouter([
  {
    path: '/',
    element: <Cards />,
    children: [
      {
        path: ':cardId',
        element: <Card />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export const App = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />

      <div>Test2</div>
    </ChakraBaseProvider>
  );
};
