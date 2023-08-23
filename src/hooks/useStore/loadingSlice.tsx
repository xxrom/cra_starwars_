import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type LoadingSliceType = {
  isLoadingList: { [key: string]: { [key: number]: boolean } };
  actionsLoading: {
    setIsLoading: (newIsLoading: boolean, particularPage?: number) => void;
  };
};

export const createLoadingSlice: StateCreator<
  StoreType,
  [],
  [],
  LoadingSliceType
> = (set, get) => ({
  isLoadingList: {},
  actionsLoading: {
    setIsLoading: (newIsLoading, particularPage) => {
      const { openedPage } = get();
      const pageNumber = particularPage ?? openedPage;

      set((store) => ({
        isLoadingList: {
          ...store.isLoadingList,
          [pageNumber]: newIsLoading,
        },
      }));
    },
  },
});

export const useIsLoadingList = () => useStore((store) => store.isLoadingList);
export const useLoadingIsLoading = () =>
  useStore((store) => {
    const { openedPage, isLoadingList } = store;

    return isLoadingList[openedPage];
  });
export const useLoadingActions = () =>
  useStore((store) => store.actionsLoading);
