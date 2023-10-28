import React from 'react';
import './App.css';
// import enviorment_variables from './enviorment_variables';
import MapContainer_component from './MapContainer/MapContainer';

function App() {
  return (
    <div className="App">
      <h1>Map of Israel</h1>
      <MapContainer_component></MapContainer_component>
      
    </div>
  );
}

export default App;
