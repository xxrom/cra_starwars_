import React, { memo, useEffect } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, PeopleGrid, NotFound, About } from './pages';
import { useLSActions, useStore } from './hooks';

const { Editable, Button, Input, Link, List, Skeleton, Divider } =
  chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Skeleton,
    Divider,
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
  const { setToLS } = useLSActions();

  // Sync data with LS
  useEffect(() => setToLS({ peopleMap }), [peopleMap, setToLS]);
  useEffect(() => setToLS({ pagesMap }), [pagesMap, setToLS]);
  useEffect(() => setToLS({ openedPage }), [openedPage, setToLS]);

  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
});
