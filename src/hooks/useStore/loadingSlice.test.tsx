import { act, renderHook, waitFor } from '@testing-library/react';
import { useStore } from './useStore';

describe('loadingSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('set isLoading to false', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.setOpenedPage(1);
      result.current.actionsLoading.setIsLoading(false);
    });

    await waitFor(() => !result.current.isLoadingList[1]);
  });

  test('set isLoading to true', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(true);
    });

    await waitFor(() => result.current.isLoadingList[1]);
  });

  test('set isLoading to true for particular page', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(true, 5);
    });

    await waitFor(() => result.current.isLoadingList[5]);
  });
});
