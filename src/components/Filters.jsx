import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';
import '../styles/Filters.css';

export default function Filters() {
  const columnValues = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const {
    setActiveFilters,
    activeFilters,
    setOrderFilters,
  } = useContext(PlanetContext);

  const [filterState, setFilterState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [columnFilters, setColumnFilters] = useState(columnValues);

  const [orderFilter, setOrderFilter] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  // const checkColumns = (option) => !activeFilters.find(({ column }) => column === option);

  const getColumnValue = (column) => {
    const newColumnFilters = columnFilters.filter((el) => el !== column);
    setFilterState({
      column: newColumnFilters[0],
      comparison: 'maior que',
      value: 0,
    });
    setColumnFilters(newColumnFilters);
  };

  const removeFilter = (index, column) => {
    const newActiveFilters = [...activeFilters];
    newActiveFilters.splice(index, 1);
    setActiveFilters(newActiveFilters);
    setColumnFilters([...columnFilters, column]);
  };

  return (
    <div className="filters-div">
      <div>
        <div>
          <select
            data-testid="column-filter"
            className="input-elements"
            value={ filterState.column }
            onChange={ ({ target }) => setFilterState({
              ...filterState, column: target.value }) }
          >
            {
              columnFilters
                // .filter(checkColumns)
                .map((filter) => (
                  <option key={ filter } value={ filter }>{filter}</option>
                ))
            }
          </select>
        </div>
        <div>
          <select
            data-testid="comparison-filter"
            className="input-elements"
            value={ filterState.comparison }
            onChange={ ({ target }) => setFilterState({
              ...filterState, comparison: target.value }) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <div>
          <label htmlFor="value-filter">
            <input
              className="input-elements"
              type="number"
              data-testid="value-filter"
              value={ filterState.value }
              onChange={ ({ target }) => setFilterState({
                ...filterState, value: target.value }) }
              id="value-filter"
            />
          </label>
        </div>
        <button
          data-testid="button-filter"
          disabled={ columnFilters.length === 0 }
          onClick={ () => {
            setActiveFilters([...activeFilters, filterState]);
            getColumnValue(filterState.column);
          } }
        >
          Filtrar
        </button>
      </div>
      <div>
        {
          activeFilters.map((filter, index) => (
            <div data-testid="filter" key={ index }>
              <p>
                {`${filter.column} ${filter.comparison} ${filter.value}`}
              </p>
              <button
                onClick={ () => removeFilter(index, filter.column) }
              >
                Apagar
              </button>
            </div>
          ))
        }
      </div>
      <div>
        <select
          data-testid="column-sort"
          value={ orderFilter.order.column }
          onChange={ ({ target }) => setOrderFilter({
            order: {
              ...orderFilter.order,
              column: target.value,
            },
          }) }
        >
          {
            columnValues
              .map((filter) => (
                <option key={ filter } value={ filter }>{filter}</option>
              ))
          }
        </select>
        <div>
          <label htmlFor="asc-radio">
            Ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              id="asc-radio"
              value="ASC"
              checked={ orderFilter.order.sort === 'ASC' }
              onChange={ ({ target }) => setOrderFilter({
                order: {
                  ...orderFilter.order,
                  sort: target.value,
                },
              }) }
            />
          </label>
          <label htmlFor="desc-radio">
            Descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              id="desc-radio"
              value="DESC"
              checked={ orderFilter.order.sort === 'DESC' }
              onChange={ ({ target }) => setOrderFilter({
                order: {
                  ...orderFilter.order,
                  sort: target.value,
                },
              }) }
            />
          </label>
        </div>
        <div>
          <button
            data-testid="column-sort-button"
            onClick={ () => setOrderFilters(orderFilter) }
          >
            Ordenar
          </button>

        </div>
      </div>
      <div>
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setActiveFilters([]);
            setColumnFilters(columnValues);
            setOrderFilters({
              order: {
                column: 'population',
                sort: '',
              },
            });
          } }
        >
          Remover todas as filtragens
        </button>
      </div>
    </div>
  );
}
