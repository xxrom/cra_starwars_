import { Box, UseToastOptions } from '@chakra-ui/react';
import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type ErrorSliceType = {
  actionsError: {
    showToast: (options: UseToastOptions) => void;
    throwError: (error: Error) => void;
  };
};

export const createErrorSlice: StateCreator<StoreType, [], [], ErrorSliceType> =
  (_set, get) => {
    return {
      actionsError: {
        showToast: () => {},
        throwError: (error: Error) => {
          console.warn('>>> >>> custom error catcher ', error);

          const { actionsError } = get();

          actionsError.showToast({
            title: error.message || 'error',
            duration: 10000,
            render: ({ title }) => (
              <Box
                color="white"
                p={5}
                bg="purple.500"
                borderRadius="6"
                fontSize="2xl"
                border="1px solid black"
              >
                {title}
              </Box>
            ),
          });
          // TODO: show custom error popup
        },
      },
    };
  };

export const useErrorActions = () => useStore((store) => store.actionsError);
