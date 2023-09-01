import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type ErrorSliceType = {
  actionsError: {
    throwError: (error: Error) => void;
  };
};

export const createErrorSlice: StateCreator<StoreType, [], [], ErrorSliceType> =
  (_set, _get) => {
    return {
      actionsError: {
        throwError: (error: Error) => {
          console.warn('>>> >>> custom error catcher ', error);
          // TODO: show custom error popup
        },
      },
    };
  };

export const useErrorActions = () => useStore((store) => store.actionsError);
