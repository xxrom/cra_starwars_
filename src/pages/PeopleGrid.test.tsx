import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup, render, screen } from '@testing-library/react';
import { PeopleGrid } from './PeopleGrid';
import { useStore } from '../hooks/useStore/useStore';
import { SKELETON_ITEMS } from '../components/PeopleList';

describe('PeropleGrid', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Create real store (from file "__mock__/zustand.ts" )
    cleanup();

    // Get Store
    const { result } = renderHook(() => useStore((store) => store));

    // Set mock loadPage function
    act(() => {
      result.current.isLoading = true;

      // Mock loadPage
      result.current.loadPage = () =>
        setTimeout(() => {
          result.current.isLoading = false;
        }, 500);
    });
  });

  test('Initial render => "Clear" button', () => {
    render(<PeopleGrid />);

    const linkElement = screen.getByText(/Clear/i);

    expect(linkElement).toBeInTheDocument();
  });

  test('after loadPage => change isLoading to false', async () => {
    const { result, waitFor } = renderHook(() => useStore((store) => store));

    render(<PeopleGrid />);

    result.current.loadPage(1);

    // We wait for the useGetAllProducts hook to complete fetching the data before proceeding
    await waitFor(() => !result.current.isLoading, { timeout: 5000 });

    // Check isLoading
    expect(result.current.isLoading).toBe(false);
  });

  test('before loadPage => show PersonCard-Skeleton', () => {
    render(<PeopleGrid />);

    const skeletonItems = screen.getAllByTestId('PersonCard-Skeleton');
    expect(skeletonItems.length).toBe(SKELETON_ITEMS);
  });

  /*
  test('after loadPage => show PersonCard-Box ', async () => {
    const { result } = renderHook(() => useStore());
    result.current.pagesMap = { 1: ['1', '2'] };
    result.current.peopleMap = { '1': {} as PersonType, '2': {} as PersonType };
    result.current.isLoading = false;
    result.current.openedPage = 1;

    render(<PeopleGrid />);

    const boxItems = screen.getAllByTestId('PersonCard-Box');
    console.log('boxItems', boxItems);
    expect(boxItems?.length).toBe(SKELETON_ITEMS);
  });
  */
});
