import PropTypes from 'prop-types';
import { useState } from 'react';
import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setSearchQuery] = useState('');

  const fetchPlanets = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;
      const planetData = results.map((result) => {
        const { residents, ...infos } = result;
        return infos;
      });
      // console.log(planetData);
      setPlanetsList(planetData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchQuery = (string) => {
    setSearchQuery(string);
  };

  return (
    <PlanetContext.Provider
      value={ { planetsList, isLoading, query, searchQuery, fetchPlanets } }
    >
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
