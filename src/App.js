import React from 'react';
import './App.css';
import HistoryComponent from './history_component/HistoryComponent';
import Play_Flight from './play_Flight/Play_flight_simulation';


function App() {
  return (
    <div className="App">
    {/* <Play_Flight></Play_Flight> */}
    <HistoryComponent></HistoryComponent>
      
    </div>
  );
}

export default App;
