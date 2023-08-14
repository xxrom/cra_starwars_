import { StateCreator } from 'zustand';
import { getFromLS } from './localStorageSlice';
import { IDType, PersonType } from './peopleSlice';
import { StoreType } from './useStore';

export type PageType = Array<IDType['id']>;
export type PagesSliceType = {
  openedPage: number;
  pagesMap: { [key: number]: PageType };
  setOpenedPage: (newOpenedPage: number) => void;
  loadPage: (fetchPage: number) => void;
  addPage: (pageNumber: number, newPage: Array<Omit<PersonType, 'id'>>) => void;
  getPageByPeopleIDs: (peopleIDs: Array<IDType['id']>) => Array<PersonType>;
};

const mockTimeout = (timeout = 1000) =>
  new Promise((res) => {
    setTimeout(() => res(''), timeout);
  });

export const createPagesSlice: StateCreator<StoreType, [], [], PagesSliceType> =
  (set, get) => {
    const { pagesMap, openedPage } = getFromLS();

    return {
      pagesMap,
      openedPage,
      setOpenedPage: (newOpenedPage) =>
        set((state) => ({
          ...state,
          openedPage: newOpenedPage,
        })),

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

        // Set empty page
        set((state) => ({
          ...state,
          pagesMap: {
            ...state.pagesMap,
            [fetchPage]: [],
          },
        }));

        setIsLoading(true);

        const { results = [] } = await fetch(
          `https://swapi.dev/api/people/?page=${fetchPage}`
        ).then((res) => res.json());

        await mockTimeout();

        addPage(fetchPage, results);

        setIsLoading(false);
      },
      addPage: (pageNumber, newPage) =>
        set((state) => {
          const generateId = ({
            name,
            height,
          }: Pick<PersonType, 'name' | 'height'>) => `${name}-${height}`;

          const peopleIDs = newPage.map(generateId);

          const newPeopleChunk = newPage.reduce((accumulate, current) => {
            const id = generateId(current);

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
  };
