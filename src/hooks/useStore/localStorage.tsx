import { StoreType } from './useStore';

export const setToLS = ({
  peopleMap,
  pagesMap,
  openedPage,
}: Pick<StoreType, 'peopleMap' | 'pagesMap' | 'openedPage'>) => {
  localStorage.setItem('peopleMap', JSON.stringify(peopleMap));
  localStorage.setItem('pagesMap', JSON.stringify(pagesMap));
  localStorage.setItem('openedPage', JSON.stringify(openedPage));
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
