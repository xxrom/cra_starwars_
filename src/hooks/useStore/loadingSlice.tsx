import { StateCreator } from 'zustand';
import { StoreType } from './useStore';

export type LoadingSliceType = {
  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;
};

export const createLoadingSlice: StateCreator<
  StoreType,
  [],
  [],
  LoadingSliceType
> = (set) => ({
  isLoading: false,
  setIsLoading: (newIsLoading) =>
    set((state) => ({
      ...state,
      isLoading: newIsLoading,
    })),
});
