import { act, renderHook, waitFor } from '@testing-library/react';
import { useLoadingActions } from './loadingSlice';
import { useStore } from './useStore';

describe('loadingSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('set isLoading to false', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsPages.setOpenedPage(1);
      result.current.actionsLoading.setIsLoading(false);
    });

    await waitFor(() => !result.current.isLoadingList[1]);
  });

  test('set isLoading to true', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsPages.setOpenedPage(2);
      result.current.actionsLoading.setIsLoading(true);
    });

    await waitFor(() => result.current.isLoadingList[2]);
  });

  test('set isLoading to true for particular page', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(true, 5);
    });

    await waitFor(() => result.current.isLoadingList[5]);
    expect(result.current.isLoadingList[5]).toBeTruthy();
    expect(result.current.isLoadingList[0]).toBeFalsy();
  });

  /*
  test('check useLoadingActions', async () => {
    //renderHook(() => useStore((store) => store));
    const { result } = renderHook(useLoadingActions);

    expect(result.current.setIsLoading).toBeDefined();
  });
  */
});
