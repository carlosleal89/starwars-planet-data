import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function Filters() {
  const {
    setActiveFilters,
    activeFilters,
  } = useContext(PlanetContext);
  const [filterState, setFilterState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columnFilters, setColumnFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const checkColumns = (option) => !activeFilters.find(({ column }) => column === option);

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
    console.log(newActiveFilters);
    console.log(column);
    setActiveFilters(newActiveFilters);
    setColumnFilters([...columnFilters, column]);
  };

  return (
    <div className="filters-div">
      <div>
        <select
          data-testid="column-filter"
          value={ filterState.column }
          onChange={ ({ target }) => setFilterState({
            ...filterState, column: target.value }) }
        >
          {
            columnFilters
              .filter(checkColumns)
              .map((filter) => (
                <option key={ filter } value={ filter }>{filter}</option>
              ))
          }
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
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
      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          setActiveFilters([]);
          setColumnFilters([
            'population',
            'orbital_period',
            'diameter',
            'rotation_period',
            'surface_water',
          ]);
        } }
      >
        Remover todas as filtragens
      </button>
    </div>
  );
}
