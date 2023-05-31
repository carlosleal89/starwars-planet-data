import React, { useContext, useEffect } from 'react';
import './App.css';
import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';

function App() {
  const { fetchPlanets } = useContext(PlanetContext);

  useEffect(() => {
    const URL = 'https://swapi.dev/api/planets';
    fetchPlanets(URL);
  }, []);

  return (
    <div>
      <Table />
    </div>
  );
}

export default App;
