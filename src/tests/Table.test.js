import React from 'react';
import { render, screen, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from '../mocks/data';

describe('Testes do componente Table', () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch");
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
        );
    })

    afterEach(jest.restoreAllMocks);

    test('Testa se os elementos do cabeçalho da tabela estão presentes.', async () => {
    await waitForElementToBeRemoved(() => screen.queryByText(/Carregando/i));
    const planet = screen.getByRole('cell', {  name: /tatooine/i});
    expect(planet).toBeInTheDocument();
    });
})