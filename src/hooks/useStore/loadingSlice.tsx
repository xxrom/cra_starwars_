import { StateCreator } from 'zustand';
import { StoreType } from './useStore';

export type LoadingSliceType = {
  isLoading: boolean;
  actions: {
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
  actions: {
    setIsLoading: (newIsLoading) =>
      set(() => ({
        isLoading: newIsLoading,
      })),
  },
});
