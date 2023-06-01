import React, { useState, useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';

export default function Header() {
  const [nameSearch, setNameSearch] = useState('');
  const { searchQuery } = useContext(PlanetContext);

  const handleChange = ({ value }) => {
    setNameSearch(value);
  };

  useEffect(() => {
    searchQuery(nameSearch);
  }, [nameSearch]);

  return (
    <div className="header-div">
      <h1>Star Wars</h1>
      <h3>Planets List</h3>
      <label htmlFor="nameInput">
        <input
          data-testid="name-filter"
          type="text"
          id="nameInput"
          value={ nameSearch }
          placeholder="Planet name"
          onChange={ ({ target }) => handleChange(target) }
        />
      </label>
    </div>
  );
}
