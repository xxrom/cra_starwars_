import { create } from 'zustand';
import { createLoadingSlice, LoadingSliceType } from './loadingSlice';
import {
  createLocalStorageSlice,
  LocalStorageSliceType,
} from './localStorageSlice';
import { createPagesSlice, PagesSliceType } from './pagesSlice';
import { createPeopleSlice, PeopleSliceType } from './peopleSlice';

export type StoreType = LoadingSliceType &
  PeopleSliceType &
  PagesSliceType &
  LocalStorageSliceType;

export const useStore = create<StoreType>((...actions) => ({
  ...createLoadingSlice(...actions),
  ...createPeopleSlice(...actions),
  ...createPagesSlice(...actions),
  ...createLocalStorageSlice(...actions),
}));
