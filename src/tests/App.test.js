import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider'

describe('Testes do componente App', () => {
test('Testa os elementos do componente Header', () => {
  render(
  <PlanetsProvider>
    <App />
  </PlanetsProvider>
  );
  const titleElement = screen.getByText(/star wars/i);
  const subtileElement = screen.getByText(/planets list/i);
  const inputElement = screen.getByRole('textbox');
  expect(titleElement).toBeInTheDocument();
  expect(subtileElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});
})
