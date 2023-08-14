import { StateCreator } from 'zustand';
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

export const setToLS = ({
  peopleMap,
  pagesMap,
  openedPage,
}: Partial<Pick<StoreType, 'peopleMap' | 'pagesMap' | 'openedPage'>>) => {
  if (peopleMap) {
    console.log('LS peopleMap', peopleMap);
    localStorage.setItem('peopleMap', JSON.stringify(peopleMap));
  }
  if (pagesMap) {
    console.log('LS pagesMap', pagesMap);
    localStorage.setItem('pagesMap', JSON.stringify(pagesMap));
  }
  if (openedPage) {
    console.log('LS openedPage', openedPage);
    localStorage.setItem('openedPage', JSON.stringify(openedPage));
  }
};

export const getFromLS = () => {
  const peopleMap = JSON.parse(localStorage.getItem('peopleMap') || '{}');
  const pagesMap = JSON.parse(localStorage.getItem('pagesMap') || '{}');
  const openedPage = Number(localStorage.getItem('openedPage')) || 1;

  return { peopleMap, pagesMap, openedPage };
};

export const clearLS = () => {
  localStorage.setItem('peopleMap', JSON.stringify({}));
  localStorage.setItem('pagesMap', JSON.stringify({}));
  localStorage.setItem('openedPage', JSON.stringify(1));
};
