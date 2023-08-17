import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type LoadingSliceType = {
  isLoading: boolean;
  actionsLoading: {
    setIsLoading: (newIsLoading: boolean) => void;
  };
};

export const createLoadingSlice: StateCreator<
  StoreType,
  [],
  [],
  LoadingSliceType
> = (set) => ({
  isLoading: false,
  actionsLoading: {
    setIsLoading: (newIsLoading) =>
      set(() => ({
        isLoading: newIsLoading,
      })),
  },
});

export const useLoadingIsLoading = () => useStore((store) => store.isLoading);
export const useLoadingActions = () =>
  useStore((store) => store.actionsLoading);
