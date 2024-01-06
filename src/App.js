import React from 'react';
import './App.css';
import HistoryComponent from './history_component/HistoryComponent';
import Play_Flight from './play_Flight/Play_flight_simulation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HistoryComponent />} />
        <Route path='/flightSimulation/:flightId' element={<Play_Flight />} />

      </Routes>
    </Router>
  );
};

export default App;
