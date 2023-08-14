import React, { memo, useEffect } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, PeopleGrid, NotFound, About } from './pages';
import { useStore } from './hooks';
import { setToLS } from './hooks/useStore/localStorageSlice';

const { Editable, Button, Input, Link, List, Skeleton } =
  chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Skeleton,
    Editable,
    Input,
    Link,
    Text,
    List,
  },
});

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PeopleGrid />,
      },
      {
        path: 'person/:personId',
        element: <Person />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export const App = memo(() => {
  const peopleMap = useStore((store) => store.peopleMap);
  const pagesMap = useStore((store) => store.pagesMap);
  const openedPage = useStore((store) => store.openedPage);

  // Sync with LS
  useEffect(() => setToLS({ peopleMap }), [peopleMap]);
  useEffect(() => setToLS({ pagesMap }), [pagesMap]);
  useEffect(() => setToLS({ openedPage }), [openedPage]);

  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
});
