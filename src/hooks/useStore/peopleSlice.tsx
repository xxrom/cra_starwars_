import { StateCreator } from 'zustand';
import { localStorageActions } from './localStorageSlice';
import { StoreType, useStore } from './useStore';

export type IDType = {
  id: string;
};
export type PersonType = {
  name: string;
  birth_year: string;
  gender: string;
  mass: number;
  height: number;
  eye_color: string;
  homeworld: string;
} & IDType;

export type PeopleSliceType = {
  peopleMap: { [key: string]: PersonType };
  actionsPeople: {
    syncPeopleMapFromLS: () => void;
    addPerson: (newPerson: PersonType) => void;
    updatePerson: (updatedPerson: PersonType) => void;
    getPerson: (personId: PersonType['id']) => PersonType;
  };
};

export const createPeopleSlice: StateCreator<
  StoreType,
  [],
  [],
  PeopleSliceType
> = (set, get) => {
  // Init get data from LS
  const { peopleMap } = localStorageActions.getFromLS();

  return {
    peopleMap,
    actionsPeople: {
      syncPeopleMapFromLS: () => {
        const { actionsLocalStorage } = get();
        const { peopleMap } = actionsLocalStorage.getFromLS();

        set((state) => ({
          ...state,
          peopleMap,
        }));
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
    },
  };
};

export const usePeopleActions = () => useStore((store) => store.actionsPeople);
