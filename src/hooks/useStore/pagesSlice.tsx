'use client';

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
  pagesMap: { [pageNumber: number]: PageMapItemType };

  actionsPages: {
    setOpenedPage: (newOpenedPage: number) => void;
    loadPage: (fetchPage: number) => void;
    addPage: (
      pageNumber: number,
      newPage: AddPageNewPageType,
      initialSearch: string
    ) => void;
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
          const {
            search,
            pagesMap,
            actionsPages,
            actionsLoading,
            actionsError,
          } = get();
          const { addPage, setOpenedPage } = actionsPages;
          const { throwError } = actionsError;

          // Validate fetchPage
          if (fetchPage < 1) {
            return;
          }

          setOpenedPage(fetchPage);

          if (pagesMap?.[fetchPage]) {
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

          try {
            const result = await fetch(
              `https://swapi.dev/api/people/?page=${fetchPage}${
                search ? `&search=${search}` : ''
              }`
            ).then((res) => {
              if (!res.ok) {
                throwError(Error('fetch error', { cause: res }));
              }

              return res.json();
            });

            if (!result) {
              return;
            }
            const { results = [] } = result;

            console.log('Results', results);

            await mockTimeout();

            addPage(fetchPage, results, search);
          } catch (error) {
            console.error('>>> fetchCatch error', error);

            console.log('actionsError', actionsError);
            throwError(error as Error);
          }

          actionsLoading.setIsLoading(false, fetchPage);
        },
        addPage: (pageNumber, pageResult, initialSearch) =>
          set((state) => {
            // TODO: set prev search to cache ?

            const { search } = get();
            if (search !== initialSearch) {
              console.log('SEARCH FROM PREVIOUS STRING');

              return state;
            }

            const peopleIDs = pageResult.map((id) => generatePersonId(id));

            const newPeopleChunk = pageResult.reduce((accumulate, current) => {
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
