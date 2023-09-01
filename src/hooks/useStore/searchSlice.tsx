import { StateCreator } from 'zustand';
import { LoadingSliceType } from './loadingSlice';
import { PagesSliceType } from './pagesSlice';
import { StoreType, useStore } from './useStore';

export type SearchSliceType = {
  search: string;
  searchCache: {
    [key: string]: {
      isLoadingList: LoadingSliceType['isLoadingList'];
      pagesMap: PagesSliceType['pagesMap'];
    };
  };

  actionsSearch: {
    setSearch: (newSearch: string) => void;
    _setSearchCache: () => void;
    _getSearchCache: () => void;
  };
};

export const createSearchSlice: StateCreator<
  StoreType,
  [],
  [],
  SearchSliceType
> = (set, get) => ({
  search: '',
  searchCache: {},

  actionsSearch: {
    _setSearchCache: () => {
      const { search, isLoadingList, pagesMap } = get();
      const onlyLoadedPages = { ...pagesMap };

      const onlyLoadedIsLoading = Object.keys(isLoadingList).reduce(
        (accumulator, key) => {
          if (isLoadingList[key]) {
            delete onlyLoadedPages[Number(key)];
          }

          return {
            ...accumulator,
            [key]: false,
          };
        },
        {}
      );

      set((state) => ({
        ...state,
        searchCache: {
          ...state.searchCache,
          [search]: {
            isLoadingList: onlyLoadedIsLoading,
            pagesMap: onlyLoadedPages,
          },
        },
      }));
    },
    _getSearchCache: () => {
      const { search, searchCache } = get();

      const { isLoadingList = {}, pagesMap = {} } = searchCache?.[search] || {};

      set((state) => ({
        ...state,
        isLoadingList,
        pagesMap,
      }));
    },
    setSearch: (newSearch) => {
      const { actionsPages, actionsSearch } = get();
      const { loadPage } = actionsPages;
      const { _setSearchCache, _getSearchCache } = actionsSearch;
      const cleanedNewSearch =
        typeof newSearch === 'string' ? newSearch.trim() : '';

      _setSearchCache();

      set((state) => ({
        ...state,
        search: cleanedNewSearch,
      }));

      _getSearchCache();

      loadPage(1);
    },
  },
});

export const useSearch = () => useStore((store) => store.search);
export const useSearchActions = () => useStore((store) => store.actionsSearch);
