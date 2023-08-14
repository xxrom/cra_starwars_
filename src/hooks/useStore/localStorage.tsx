import { StoreType } from './useStore';

export const setToLS = ({
  peopleMap,
  pagesMap,
}: Pick<StoreType, 'peopleMap' | 'pagesMap'>) => {
  localStorage.setItem('peopleMap', JSON.stringify(peopleMap));
  localStorage.setItem('pagesMap', JSON.stringify(pagesMap));
};

export const getFromLS = () => {
  const peopleMap = JSON.parse(localStorage.getItem('peopleMap') || '{}');
  const pagesMap = JSON.parse(localStorage.getItem('pagesMap') || '{}');

  return { peopleMap, pagesMap };
};

export const clearLS = () => {
  localStorage.setItem('peopleMap', JSON.stringify({}));
  localStorage.setItem('pagesMap', JSON.stringify({}));
};
