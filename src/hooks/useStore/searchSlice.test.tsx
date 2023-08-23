import { act, renderHook } from '@testing-library/react';
import { useStore } from './useStore';

describe('searchSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('init search should be empty string', async () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.search).toStrictEqual('');
  });

  test('setSearch', async () => {
    const { result } = renderHook(() => useStore());
    const newSearch = 'a';

    act(() => {
      result.current.actionsSearch.setSearch(newSearch);
    });

    expect(result.current.search).toEqual(newSearch);
  });
});
