import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from '../mocks/data';

describe('Testes do componente Table', () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch");
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });

        render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
        );
    })

    afterEach(() => {
        global.fetch.mockRestore();
    });

    test('Testa se os elementos do cabeçalho da tabela estão presentes.', () => {
      act(async () => {
          const headersEl = await screen.findAllByRole('columnheader');
          const diameterHeader = screen.getByRole('columnheader', { name: /diameter/i});
          expect(diameterHeader).toBeInTheDocument();
          expect(headersEl.toBeInTheDocument());
      })  
    //   expect(nameHeader).toBeInTheDocument();
    });
    })