import {
  render,
  renderHook,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { useStore } from '../hooks/useStore/useStore';
import { PersonCard, PersonCardType } from './PersonCard';
import { BrowserRouter } from 'react-router-dom';

const mockCard: PersonCardType = {
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
    const { result } = renderHook(() => useStore((store) => store));

    act(() => {
      result.current.actionsLoading.setIsLoading(true);
    });
  });

  test('isLoading = true, show Skeleton', async () => {
    renderHook(() => useStore((store) => store));

    render(<PersonCard {...mockCard} />);

    await waitFor(() =>
      expect(screen.findByTestId('PersonCard-Skeleton')).toBeDefined()
    );
  });

  test('isLoading = false, show mockUser name on screen', async () => {
    const { result } = renderHook(() => useStore((store) => store));

    render(<PersonCard {...mockCard} />, { wrapper: BrowserRouter });

    act(() => {
      result.current.actionsLoading.setIsLoading(false);
    });

    // await for mock user
    expect(await screen.findByTestId('PersonCard-Box')).toBeDefined();

    // await for name search
    expect(
      await screen.findByText(mockCard.name).then((res) => res.textContent)
    ).toBe(mockCard.name);
  });
});
