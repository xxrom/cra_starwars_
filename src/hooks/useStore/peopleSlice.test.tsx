import { act, renderHook } from '@testing-library/react';
import { PeopleSliceType, PersonType } from './peopleSlice';
import { useStore } from './useStore';

const getPeopleMap = (): PeopleSliceType['peopleMap'] => ({
  '1': { name: 'Name' } as PersonType,
});

// Mock localStorageActions module
jest.mock('./localStorageSlice', () => {
  const originalModule = jest.requireActual('./localStorageSlice');

  return {
    __esModule: true,
    ...originalModule,
    localStorageActions: {
      ...originalModule.localStorageActions,
      getFromLS: jest.fn(() => {
        return {
          peopleMap: getPeopleMap(),
          pagesMap: {},
          openedPage: 1,
        };
      }),
    },
  };
});

describe('peopleSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('mock localStorage peopleMap', async () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.peopleMap).toStrictEqual(getPeopleMap());
  });

  test('act syncPeopleMapFromLS from inside of store, it is not mocked', async () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.actionsPeople.syncPeopleMapFromLS();
    });

    expect(result.current.peopleMap).toStrictEqual({});
  });
});
