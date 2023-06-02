import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filteredPlanetList, setFilteredPlanetList] = useState(planetsList);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

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
      setPlanetsList(planetData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredPlanetList(planetsList);
  }, [planetsList]);

  return (
    <PlanetContext.Provider
      value={
        {
          planetsList,
          isLoading,
          query,
          filteredPlanetList,
          activeFilters,
          setActiveFilters,
          setFilteredPlanetList,
          setSearchQuery,
          fetchPlanets }
      }
    >
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
