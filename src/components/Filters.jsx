import React, { useState, useContext } from 'react';

export default function Filters() {
  return (
    <div className="filters-div">
      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
    </div>
  );
}
