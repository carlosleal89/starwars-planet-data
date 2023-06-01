import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function Filters() {
  const [filter, setFilter] = useState('population');
  const { filterSelection } = useContext(PlanetContext);

  useEffect(() => {
    filterSelection(filter);
  }, [filter]);

  return (
    <div className="filters-div">
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilter(target.value) }
      >
        <option value="population">population</option>
        <option value="orbitalPeriod">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
    </div>
  );
}
