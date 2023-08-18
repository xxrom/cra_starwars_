import { StateCreator } from 'zustand';
import { mockTimeout } from '../../helper';
import { generatePersonId } from './helper';
import { localStorageActions } from './localStorageSlice';
import { IDType, PersonType } from './peopleSlice';
import { StoreType, useStore } from './useStore';

export type PageMapItemType = Array<IDType['id']>;
export type AddPageNewPageType = Array<Omit<PersonType, 'id'>>;
export type PagesSliceType = {
  openedPage: number;
  pagesMap: { [key: number]: PageMapItemType };

  actionsPages: {
    setOpenedPage: (newOpenedPage: number) => void;
    loadPage: (fetchPage: number) => void;
    addPage: (pageNumber: number, newPage: AddPageNewPageType) => void;
    getPageByPeopleIDs: (peopleIDs: Array<IDType['id']>) => Array<PersonType>;
  };
};

export const createPagesSlice: StateCreator<StoreType, [], [], PagesSliceType> =
  (set, get) => {
    // Init get data from LS
    const { pagesMap, openedPage } = localStorageActions.getFromLS();

    return {
      pagesMap,
      openedPage,

      actionsPages: {
        setOpenedPage: (newOpenedPage) =>
          set((state) => ({
            ...state,
            openedPage: newOpenedPage,
          })),
        loadPage: async (fetchPage: number) => {
          const { pagesMap, actionsPages, actionsLoading } = get();
          const { addPage, setOpenedPage } = actionsPages;

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
            const peopleIDs = newPage.map((id) => generatePersonId(id));

            const newPeopleChunk = newPage.reduce((accumulate, current) => {
              const id = generatePersonId(current);

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
      },
    };
  };

export const usePagesMap = () => useStore((store) => store.pagesMap);
export const useOpenedPage = () => useStore((store) => store.openedPage);
export const usePagesActions = () => useStore((store) => store.actionsPages);
