import React, { useContext, useEffect } from 'react';
import './styles/App.css';
import PlanetContext from './context/PlanetsContext';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  const { fetchPlanets } = useContext(PlanetContext);

  useEffect(() => {
    const URL = 'https://swapi.dev/api/planets';
    fetchPlanets(URL);
  }, []);

  return (
    <div>
      <Header />
      <Table />
    </div>
  );
}

export default App;
