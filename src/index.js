import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import './styles/index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
