import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetsContext';
import '../styles/Table.css';
import Loading from './Loading';

export default function Table() {
  const {
    filteredPlanetList,
    isLoading,
    query,
    activeFilters,
    orderFilters,
  } = useContext(PlanetContext);
  const [keys, setKeys] = useState([]);

  const filterTabHeader = (planetList) => {
    const listKeys = Object.keys(planetList);
    const headers = [];
    listKeys.forEach((headerEl) => {
      if (headerEl !== 'url'
      && headerEl !== 'edited'
      && headerEl !== 'created'
      && headerEl !== 'films') {
        headers.push(headerEl);
      }
    });
    return headers;
  };

  useEffect(() => {
    if (filteredPlanetList.length > 0) {
      const tabHeaders = filterTabHeader(filteredPlanetList[0]);
      setKeys(tabHeaders);
    }
  }, [filteredPlanetList, orderFilters]);

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

  const sortFilter = () => {
    const sortedArray = filteredPlanetList;
    const unknownCheck = -1;
    switch (orderFilters.order.sort) {
    case '':
      return filteredPlanetList;
    case 'ASC':
      return (
        sortedArray
          .sort((a, b) => (b[orderFilters.order.column] === 'unknown'
            ? unknownCheck : a[orderFilters.order.column] - b[orderFilters.order.column]))
      );
    case 'DESC':
      return (
        sortedArray.sort((a, b) => (b[orderFilters.order.column] === 'unknown'
          ? unknownCheck : b[orderFilters.order.column] - a[orderFilters.order.column]))
      );
    default: return true;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
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
                  .filter(sortFilter)
                  .map((planet, index) => (
                    <tr key={ index }>
                      <td data-testid="planet-name">{planet.name}</td>
                      <td>{planet.rotation_period}</td>
                      <td>{planet.orbital_period}</td>
                      <td>{planet.diameter}</td>
                      <td>{planet.climate}</td>
                      <td>{planet.gravity}</td>
                      <td>{planet.terrain}</td>
                      <td>{planet.surface_water}</td>
                      <td>{planet.population}</td>
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
