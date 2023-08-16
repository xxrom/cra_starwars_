import { render, screen, act, renderHook } from '@testing-library/react';
import { PeopleGrid } from './PeopleGrid';
import { useStore } from '../hooks/useStore/useStore';
import { PersonType } from '../hooks/useStore/peopleSlice';
import { BrowserRouter } from 'react-router-dom';

describe('PeropleGrid', () => {
  test('Initial render => "Clear" button', () => {
    render(<PeopleGrid />, { wrapper: BrowserRouter });

    const linkElement = screen.getByText(/Clear/i);

    expect(linkElement).toBeInTheDocument();
  });

  test('Init loadPage should be called only 1 time', async () => {
    const { result } = renderHook(() => useStore());

    // Spy on loadPage
    result.current.loadPage = jest.fn();
    render(<PeopleGrid />, { wrapper: BrowserRouter });

    act(() => {
      // emulate opening new page
      result.current.setOpenedPage(2);
    });

    // wait for some time
    await new Promise((res) => setTimeout(() => res(''), 1000));

    expect(result.current.loadPage).toBeCalledTimes(1);
  });

  test('Init load should show PersonCard-Skeleton', () => {
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.openedPage = 1;

      const mockPerson = {} as PersonType;
      // Mock people to show on page
      result.current.getPageByPeopleIDs = () => [
        mockPerson,
        mockPerson,
        mockPerson,
      ];
      result.current.isLoading = true;
    });

    render(<PeopleGrid />, { wrapper: BrowserRouter });

    const skeletonItems = screen.getAllByTestId('PersonCard-Skeleton');
    expect(skeletonItems.length).toBe(3);
  });
});
