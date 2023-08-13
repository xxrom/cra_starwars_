import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type IDType = {
  id: string;
};
export type PersonType = {
  name: string;
  birth_year: string;
  gender: string;
  mass: string;
  height: string;
} & IDType;
export type PageType = Array<IDType['id']>;

export type StoreType = {
  peopleMap: { [key: string]: PersonType };
  pagesMap: { [key: number]: PageType };

  openedPage: number;
  setOpenedPage: (newOpenedPage: number) => void;

  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void;

  addPerson: (newPerson: PersonType) => void;
  updatePerson: (updatedPerson: PersonType) => void;
  getPerson: (personId: IDType['id']) => PersonType;
  loadPage: (fetchPage: number) => void;
  addPage: (pageNumber: number, newPage: Array<Omit<PersonType, 'id'>>) => void;
  getPageByPeopleIDs: (peopleIDs: Array<IDType['id']>) => Array<PersonType>;
};

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

const mockTimeout = (timeout = 400) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });

export const useStore = create<StoreType>((set, get) => {
  const { peopleMap, pagesMap } = getFromLS();

  console.log('init store', pagesMap, peopleMap);

  return {
    peopleMap,
    pagesMap,

    openedPage: 1,
    setOpenedPage: (newOpenedPage) =>
      set((state) => ({
        ...state,
        openedPage: newOpenedPage,
      })),

    isLoading: false,
    setIsLoading: (newIsLoading) =>
      set((state) => ({
        ...state,
        isLoading: newIsLoading,
      })),

    addPerson: (newPerson) =>
      set((state) => ({
        ...state,
        peopleMap: {
          ...state.peopleMap,
          [newPerson.id]: newPerson,
        },
      })),
    updatePerson: (updatedPerson) =>
      set((state) => ({
        ...state,
        peopleMap: {
          ...state.peopleMap,
          [updatedPerson.id]: updatedPerson,
        },
      })),
    getPerson: (personId) => {
      const state = get();

      return state.peopleMap[personId];
    },

    loadPage: async (fetchPage: number) => {
      const { pagesMap, addPage, setOpenedPage, setIsLoading } = get();

      // Validate fetchPage
      if (fetchPage < 1) {
        return;
      }

      setOpenedPage(fetchPage);

      if (pagesMap[fetchPage]) {
        return;
      }

      // Separe isLoading per page (is it will be independent from each other)
      setIsLoading(true);

      // TODO: validate 404 error
      const { results = [] } = await fetch(
        `https://swapi.dev/api/people/?page=${fetchPage}`
      ).then((res) => res.json());

      await mockTimeout();

      addPage(fetchPage, results);

      setIsLoading(false);
    },
    addPage: (pageNumber, newPage) =>
      set((state) => {
        const getPersonId = ({
          name,
          height,
        }: Pick<PersonType, 'name' | 'height'>) => `${name}-${height}`;

        const peopleIDs = newPage.map(getPersonId);

        const newPeopleChunk = newPage.reduce((accumulate, current) => {
          const id = getPersonId(current);

          return {
            ...accumulate,
            [id]: {
              ...current,
              id,
            },
          };
        }, {});

        return {
          ...state,
          peopleMap: {
            ...state.peopleMap,
            ...newPeopleChunk,
          },
          pagesMap: {
            ...state.pagesMap,
            [pageNumber]: peopleIDs,
          },
        };
      }),
    getPageByPeopleIDs: (peopleIDs) => {
      const state = get();

      return peopleIDs.map((id) => state.getPerson(id));
    },
  };
});
