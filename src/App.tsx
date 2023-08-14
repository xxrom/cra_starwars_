import React, { memo, useEffect } from 'react';
import {
  Box,
  ChakraBaseProvider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  extendBaseTheme,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, PeopleGrid, NotFound } from './pages';
import { useStore } from './hooks';
import { setToLS } from './hooks/useStore/localStorage';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
    Box,
    Skeleton,
    SkeletonText,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Input,
    InputLeftAddon,
    InputGroup,
    Stack,
    Link,
    SimpleGrid,
    Text,
    List,
    ListItem,
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
    ],
    errorElement: <NotFound />,
  },
]);

export const App = memo(() => {
  const { peopleMap, pagesMap } = useStore();

  // Sync with LS
  useEffect(() => {
    setToLS({ peopleMap, pagesMap });
  }, [peopleMap, pagesMap]);

  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
});
