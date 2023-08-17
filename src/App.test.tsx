import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('Render StarWars text', () => {
    render(<App />);

    const linkElement = screen.getByText(/StarWars/i);

    expect(linkElement).toBeInTheDocument();
  });
});
