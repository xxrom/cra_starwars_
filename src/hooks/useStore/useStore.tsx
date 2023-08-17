import { create } from 'zustand';
import { createLoadingSlice, LoadingSliceType } from './loadingSlice';
import {
  createLocalStorageSlice,
  LocalStorageSliceType,
} from './localStorageSlice';
import { createPagesSlice, PagesSliceType } from './pagesSlice';
import { createPeopleSlice, PeopleSliceType } from './peopleSlice';

// Merge all types togather
import { DeepMergeTwoTypes } from '../../types_helper';
/*
export type StoreType = DeepMergeTwoTypes<
  [LoadingSliceType],
  [PeopleSliceType, PagesSliceType, LocalStorageSliceType]
>;
*/

export type StoreType = LoadingSliceType &
  PeopleSliceType &
  PagesSliceType &
  LocalStorageSliceType;

export const useStore = create<StoreType>((...a) => ({
  ...createLoadingSlice(...a),
  ...createLocalStorageSlice(...a),
  ...createPeopleSlice(...a),
  ...createPagesSlice(...a),
}));
