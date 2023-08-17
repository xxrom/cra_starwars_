import { StateCreator } from 'zustand';
import { mockTimeout } from '../../helper';
import { localStorageActions } from './localStorageSlice';
import { IDType, PersonType } from './peopleSlice';
import { StoreType } from './useStore';

export type PageMapType = Array<IDType['id']>;
export type PagesSliceType = {
  openedPage: number;
  pagesMap: { [key: number]: PageMapType };
  setOpenedPage: (newOpenedPage: number) => void;
  loadPage: (fetchPage: number) => void;
  addPage: (pageNumber: number, newPage: Array<Omit<PersonType, 'id'>>) => void;
  getPageByPeopleIDs: (peopleIDs: Array<IDType['id']>) => Array<PersonType>;
};

export const createPagesSlice: StateCreator<StoreType, [], [], PagesSliceType> =
  (set, get) => {
    // Init get data from LS
    const { pagesMap, openedPage } = localStorageActions.getFromLS();

    return {
      pagesMap,
      openedPage,

      setOpenedPage: (newOpenedPage) =>
        set((state) => ({
          ...state,
          openedPage: newOpenedPage,
        })),
      loadPage: async (fetchPage: number) => {
        const { pagesMap, addPage, setOpenedPage, actionsLoading } = get();

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

        actionsLoading.setIsLoading(true, fetchPage);

        const { results = [] } = await fetch(
          `https://swapi.dev/api/people/?page=${fetchPage}`
        ).then((res) => res.json());

        await mockTimeout();

        addPage(fetchPage, results);

        actionsLoading.setIsLoading(false, fetchPage);
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
        const { actionsPeople } = get();

        return peopleIDs.map((id) => actionsPeople.getPerson(id));
      },
    };
  };
