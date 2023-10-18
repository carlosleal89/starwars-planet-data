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
      <div className="filter-selectors-container">
        <div id="number-filter-container">
          <div>
            <select
              className="input-elements"
              value={ filterState.column }
              onChange={ ({ target }) => setFilterState({
                ...filterState, column: target.value }) }
            >
              {
                columnFilters
                  .map((filter) => (
                    <option key={ filter } value={ filter }>{filter}</option>
                  ))
              }
            </select>
          </div>
          <div>
            <select
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
                value={ filterState.value }
                onChange={ ({ target }) => setFilterState({
                  ...filterState, value: target.value }) }
                id="value-filter"
              />
            </label>
          </div>
          <button
            id="filter-btn"
            disabled={ columnFilters.length === 0 }
            onClick={ () => {
              setActiveFilters([...activeFilters, filterState]);
              getColumnValue(filterState.column);
            } }
          >
            Filtrar
          </button>
        </div>
        <div id="order-filter-container">
          <select
            className="input-elements"
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
          <select
            className="input-elements"
            onChange={ ({ target }) => setOrderFilter({
              order: {
                ...orderFilter.order,
                sort: target.value,
              },
            }) }
          >
            <option value="ASC" selected>ASC</option>
            <option value="DESC">DESC</option>
          </select>
          <div>
            <button
              onClick={ () => setOrderFilters(orderFilter) }
              id="order-btn"
            >
              Ordenar
            </button>

          </div>
        </div>
      </div>
      <div id="active-filters-container">
        {
          activeFilters.map((filter, index) => (
            <div className="active-filter" key={ index }>
              <p id="active-filter-name">
                {`${filter.column} ${filter.comparison}:`}
              </p>
              <p id="active-filter-value">
                {`${filter.value}`}
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
      <button
        id="remove-btn"
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
        Remover filtros
      </button>
    </div>
  );
}
