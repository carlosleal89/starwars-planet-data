import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetsContext';
import './Table.css';

export default function Table() {
  const {
    filteredPlanetList,
    isLoading,
    query,
    activeFilters,
  } = useContext(PlanetContext);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (filteredPlanetList.length > 0) {
      setKeys(Object.keys(filteredPlanetList[0]));
    }
  }, [filteredPlanetList]);

  const applyFilters = (planet) => {
    const filterConditions = [];
    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        return (
          filterConditions.push(planet[filter.column]
            > Number(filter.value)));
      case 'menor que':
        return (
          filterConditions.push(planet[filter.column]
            < Number(filter.value)));
      case 'igual a':
        return (
          filterConditions.push(Number(planet[filter.column])
            === Number(filter.value)));
      default:
        return true;
      }
    });
    return filterConditions.every((el) => el);
  };

  return (
    <div>
      {isLoading ? (
        <h2>Carregando...</h2>
      ) : (
        <div className="table-div">
          <table className="table">
            <thead>
              <tr>
                {keys.map((key) => (
                  <th key={ key }>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                filteredPlanetList
                  .filter(({ name }) => {
                    const value = name.toLowerCase();
                    return value.includes(query);
                  })
                  .filter(applyFilters)
                  .map((planet, index) => (
                    <tr key={ index }>
                      <td>{planet.name}</td>
                      <td>{planet.rotation_period}</td>
                      <td>{planet.orbital_period}</td>
                      <td>{planet.diameter}</td>
                      <td>{planet.climate}</td>
                      <td>{planet.gravity}</td>
                      <td>{planet.terrain}</td>
                      <td>{planet.surface_water}</td>
                      <td>{planet.population}</td>
                      <td>{planet.films}</td>
                      <td>{planet.created}</td>
                      <td>{planet.edited}</td>
                      <td>{planet.url}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
