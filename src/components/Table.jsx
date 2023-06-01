import React, { useContext, useEffect, useState } from 'react';
import PlanetContext from '../context/PlanetsContext';
import './Table.css';

export default function Table() {
  const { planetsList, isLoading, query } = useContext(PlanetContext);
  const [keys, setKeys] = useState([]);
  console.log(query);

  useEffect(() => {
    if (planetsList.length > 0) {
      setKeys(Object.keys(planetsList[0]));
    }
  }, [planetsList]);

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
            {
              planetsList
                .filter(({ name }) => {
                  const value = name.toLowerCase();
                  return value.includes(query);
                })
                .map((planet, index) => (
                  <tbody key={ index }>
                    <tr>
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
                  </tbody>
                ))
            }
          </table>
        </div>
      )}
    </div>
  );
}
