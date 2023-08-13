import { create } from 'zustand';

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
  addPerson: (newPerson: PersonType) => void;
  updatePerson: (updatedPerson: PersonType) => void;
  getPerson: (personId: IDType['id']) => PersonType;
  addPage: (pageNumber: number, newPage: Array<Omit<PersonType, 'id'>>) => void;
  getPageByPeopleIDs: (peopleIDs: Array<IDType['id']>) => Array<PersonType>;
};

export const useStore = create<StoreType>((set, get) => ({
  peopleMap: {},
  pagesMap: {},

  openedPage: 0,
  setOpenedPage: (newOpenedPage) =>
    set((state) => ({
      ...state,
      openedPage: newOpenedPage,
    })),

  fetchPeople: () => {
    // TODO: move from People component
  },

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
}));
