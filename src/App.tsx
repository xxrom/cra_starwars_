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
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Person, People, NotFound } from './pages';
import { useStore } from './hooks';
import { setToLS } from './hooks/useStore/useStore';

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
