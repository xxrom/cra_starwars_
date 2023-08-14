import { StateCreator } from 'zustand';
import { clearLS } from './localStorage';
import { StoreType } from './useStore';

export type LocalStorageSliceType = {
  clearAll: () => void;
};

export const createLocalStorageSlice: StateCreator<
  StoreType,
  [],
  [],
  LocalStorageSliceType
> = (set) => ({
  clearAll: () => {
    clearLS();

    set((state) => ({
      ...state,
      openedPage: 0,
      isLoading: false,
      peopleMap: {},
      pagesMap: {},
    }));
  },
});
