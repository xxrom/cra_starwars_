import { act, renderHook, waitFor } from '@testing-library/react';
import { useStore } from './useStore';

describe('loadingSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('set isLoading to false', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(false);
    });

    await waitFor(() => !result.current.isLoading);
  });

  test('set isLoading to true', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(true);
    });

    await waitFor(() => result.current.isLoading);
  });
});
