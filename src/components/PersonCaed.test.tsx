import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup, render, screen } from '@testing-library/react';
import { useStore } from '../hooks/useStore/useStore';
import { PersonCard, PersonCardType } from './PersonCard';

const mockData: PersonCardType = {
  id: 'Id',
  name: 'Name',
  mass: 100,
  height: 200,
  homeworld: 'Homeworld',
  eye_color: 'color',
  birth_year: 'birthYear',
  gender: 'gender',
};

describe('PersonCard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();

    const { result } = renderHook(() => useStore((store) => store));
    act(() => {
      result.current.isLoading = true;
    });
  });

  test('isLoading = true, show Skeleton', () => {
    renderHook(() => useStore((store) => store));

    render(<PersonCard {...mockData} />);

    expect(screen.findByTestId('PersonCard-Skeleton')).toBeDefined();
  });

  test('isLoading = false, show Box', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    render(<PersonCard {...mockData} />);

    result.current.isLoading = false;

    expect(screen.findByTestId('PersonCard-Box')).toBeDefined();
  });
});
