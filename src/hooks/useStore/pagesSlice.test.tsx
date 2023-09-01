import { act, renderHook } from '@testing-library/react';
import { generatePersonId } from './helper';
import type { PersonType } from './peopleSlice';
import { useStore } from './useStore';

const getPagesMap = () => ({ 1: ['1', '2'] });
const getOpenedPage = () => 1;

export const getPersonMock = (i: number): PersonType => ({
  id: `id${i}`,
  name: `name${i}`,
  birth_year: `name${i}`,
  gender: `gender${i}`,
  mass: 50 + Number(i),
  height: 100 + Number(i),
  eye_color: `eye_color${i}`,
  homeworld: `homeworld${i}`,
});

// Mock localStorageActions module
jest.mock('./localStorageSlice', () => {
  const originalModule = jest.requireActual('./localStorageSlice');

  return {
    __esModule: true,
    ...originalModule,
    localStorageActions: {
      ...originalModule.localStorageActions,
      getFromLS: jest.fn(() => ({
        peopleMap: {},
        pagesMap: getPagesMap(),
        openedPage: getOpenedPage(),
      })),
    },
  };
});

describe('pagesSlice ', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('default pagesMap and openedPage', async () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.pagesMap).toStrictEqual(getPagesMap());
    expect(result.current.openedPage).toStrictEqual(getOpenedPage());
  });

  test('setOpenedPage', async () => {
    const { result } = renderHook(() => useStore());

    const page = 2;

    act(() => {
      result.current.actionsPages.setOpenedPage(page);
    });

    expect(result.current.openedPage).toStrictEqual(page);
  });

  test('addPage', () => {
    const { result } = renderHook(() => useStore());

    const page = 1;

    const newPage = [getPersonMock(1), getPersonMock(2)];

    act(() => {
      result.current.actionsPages.addPage(page, newPage, '');
    });

    expect(result.current.pagesMap).toStrictEqual({
      [page]: newPage.map(generatePersonId),
    });
  });

  test('getPageByPeopleIDs', () => {
    const { result } = renderHook(() => useStore());

    const person1 = getPersonMock(1);
    const person2 = getPersonMock(2);

    act(() => {
      result.current.actionsPeople.addPerson(person1);
      result.current.actionsPeople.addPerson(person2);
    });

    const peopleIDs = [person1.id, person2.id];

    expect(
      result.current.actionsPages.getPageByPeopleIDs(peopleIDs)
    ).toStrictEqual([person1, person2]);
  });
});
