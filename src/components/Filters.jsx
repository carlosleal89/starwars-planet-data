import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function Filters() {
  const {
    planetsList,
    setFilteredPlanetList,
  } = useContext(PlanetContext);
  const [filterState, setFilterState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  // const [selectedFilters, setSelectedFilters] = useState();

  const applyFilters = () => {
    switch (filterState.comparison) {
    case 'maior que':
      return (
        setFilteredPlanetList(planetsList
          .filter((planet) => planet[filterState.column]
          > Number(filterState.value)))
      );
    case 'menor que':
      return (
        setFilteredPlanetList(planetsList
          .filter((planet) => planet[filterState.column]
          < Number(filterState.value)))
      );
    case 'igual a':
      return (
        setFilteredPlanetList(planetsList
          .filter((planet) => Number(planet[filterState.column])
          === Number(filterState.value)))
      );
    default:
      return (console.log('default'));
    }
  };

  useEffect(() => {
    setFilteredPlanetList(planetsList);
  }, [planetsList]);

  return (
    <div className="filters-div">
      <div>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setFilterState({
            ...filterState, column: target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
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
        onClick={ () => applyFilters() }
      >
        Filtrar
      </button>
    </div>
  );
}
