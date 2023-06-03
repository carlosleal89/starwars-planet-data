import React from 'react';
import { render, screen, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from '../mocks/mockData';

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
        const tableHeaders = screen.getAllByTestId('planet-name');
        tableHeaders.forEach((header) => expect(header).toBeInTheDocument());
    });

    test('Testa o filtro por nome', () => {
        const inputPlanet = screen.getByTestId('name-filter');
        expect(inputPlanet).toBeInTheDocument();

        userEvent.type(inputPlanet, 'o');
        const tatooine = screen.getByRole('cell', {name: /tatooine/i});
        expect(tatooine).toBeInTheDocument();
        const dagobah = screen.getByRole('cell', {  name: /hoth/i})
        expect(dagobah).toBeInTheDocument();
    });

    test('Testa o filtro numerico', () => {

    })
})