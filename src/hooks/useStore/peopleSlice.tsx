import { StateCreator } from 'zustand';
import { getFromLS } from './localStorageSlice';
import { StoreType } from './useStore';

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
  addPerson: (newPerson: PersonType) => void;
  updatePerson: (updatedPerson: PersonType) => void;
  getPerson: (personId: PersonType['id']) => PersonType;
};

export const createPeopleSlice: StateCreator<
  StoreType,
  [],
  [],
  PeopleSliceType
> = (set, get) => {
  const { peopleMap } = getFromLS();

  return {
    peopleMap,
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
  };
};
