import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type SearchSliceType = {
  search: string;

  actionsSearch: {
    setSearch: (newSearch: string) => void;
  };
};

export const createSearchSlice: StateCreator<
  StoreType,
  [],
  [],
  SearchSliceType
> = (set, get) => {
  const search = '';

  return {
    search,

    actionsSearch: {
      setSearch: (newSearch) => {
        //const { openedPage } = get();
        //const { loadPage } = actionsPages;

        set((state) => ({
          ...state,
          search: newSearch,
          /*
          pagesMap: {
            ...state.pagesMap,
            [openedPage]: [],
          },
          */
        }));

        console.log('newSearch', newSearch);

        //loadPage(1);
      },
    },
  };
};

export const useSearch = () => useStore((store) => store.search);
export const useSearchActions = () => useStore((store) => store.actionsSearch);
