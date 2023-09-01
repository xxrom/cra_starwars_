import { StateCreator } from 'zustand';
import { StoreType, useStore } from './useStore';

export type LocalStorageType = Pick<
  StoreType,
  'peopleMap' | 'pagesMap' | 'openedPage'
>;
export type SetToLSType = Partial<LocalStorageType>;
export type LocalStorageSliceType = {
  actionsLocalStorage: {
    clearAll: () => void;
    getFromLS: () => LocalStorageType;
    setToLS: ({ peopleMap, pagesMap, openedPage }: SetToLSType) => void;
  };
};

export const createLocalStorageSlice: StateCreator<
  StoreType,
  [],
  [],
  LocalStorageSliceType
> = (set) => ({
  actionsLocalStorage: {
    clearAll: () => {
      localStorage.setItem('peopleMap', JSON.stringify({}));
      localStorage.setItem('pagesMap', JSON.stringify({}));
      localStorage.setItem('openedPage', JSON.stringify(1));

      set((state) => ({
        ...state,
        openedPage: 1,
        isLoading: false,
        peopleMap: {},
        pagesMap: {},
        searchCache: {},
        search: '',
      }));
    },
    ...localStorageActions,
  },
});

export const localStorageActions: Pick<
  LocalStorageSliceType['actionsLocalStorage'],
  'getFromLS' | 'setToLS'
> = {
  getFromLS: () => {
    const peopleMap = JSON.parse(localStorage.getItem('peopleMap') || '{}');
    const pagesMap = JSON.parse(localStorage.getItem('pagesMap') || '{}');
    const openedPage = Number(localStorage.getItem('openedPage') || 1);

    return { peopleMap, pagesMap, openedPage };
  },
  setToLS: ({ peopleMap, pagesMap, openedPage }: SetToLSType) => {
    if (peopleMap) {
      localStorage.setItem('peopleMap', JSON.stringify(peopleMap));
    }
    if (pagesMap) {
      localStorage.setItem('pagesMap', JSON.stringify(pagesMap));
    }
    if (openedPage) {
      localStorage.setItem('openedPage', JSON.stringify(openedPage));
    }
  },
};

export const useLSActions = () =>
  useStore((store) => store.actionsLocalStorage);
