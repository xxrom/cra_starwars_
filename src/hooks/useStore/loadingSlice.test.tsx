import { renderHook } from '@testing-library/react-hooks';
import { useStore } from './useStore';

describe('loadingSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('set isLoading to false', () => {
    const { result } = renderHook(() => useStore((store) => store));

    result.current.setIsLoading(false);

    expect(result.current.isLoading).toBe(false);
  });

  test('set isLoading to true', () => {
    const { result } = renderHook(() => useStore((store) => store));

    result.current.setIsLoading(true);

    expect(result.current.isLoading).toBe(true);
  });
});
