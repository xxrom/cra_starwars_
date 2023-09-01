import React, { memo, useEffect, useRef } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, PeopleGrid, NotFound, About } from './pages';
import { useLSActions, usePeopleMap, useStore } from './hooks';

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
  const ref = useRef(false);
  const peopleMap = usePeopleMap();
  const pagesMap = useStore((store) => store.pagesMap);
  const openedPage = useStore((store) => store.openedPage);
  const { setToLS } = useLSActions();

  // Sync data with LS
  useEffect(() => setToLS({ peopleMap }), [peopleMap, setToLS]);
  useEffect(() => setToLS({ pagesMap }), [pagesMap, setToLS]);
  useEffect(() => setToLS({ openedPage }), [openedPage, setToLS]);

  useEffect(() => {
    if (ref.current) {
      // already visited
      return;
    }

    ref.current = true; // set as visited

    // Set my custom throwError, so I can use it inside zustand!
    useStore.setState({
      actionsError: {
        throwError: (error: Error) => {
          console.warn('>>> >>> custom error catcher ', error);
          // TODO: show custom error popup
        },
      },
    });
  });

  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
});
