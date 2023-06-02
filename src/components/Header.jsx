import React, { useState, useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetsContext';
import Filters from './Filters';
import './Header.css';

export default function Header() {
  const [nameSearch, setNameSearch] = useState('');
  const { setSearchQuery } = useContext(PlanetContext);

  const handleChange = ({ value }) => {
    setNameSearch(value);
  };

  useEffect(() => {
    setSearchQuery(nameSearch);
  }, [nameSearch]);

  return (
    <div className="header-div">
      <div className="input-div">
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
      <Filters />
    </div>
  );
}
