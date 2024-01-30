import {React,useEffect} from 'react';
import './App.css';
import HistoryComponent from './history_component/HistoryComponent';
import Play_Flight from './play_Flight/Play_flight_simulation';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import LoginPage from './login_register/LoginPage';


const NavigateToAbout = () => { // component to render login at first page .
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/LoginPage');
  }, [navigate]);

  return null; // This component doesn't render anything, it just performs the navigation
}


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<NavigateToAbout />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/flightsHistory' element={<HistoryComponent />} />
        <Route path='/flightSimulation/:flightId' element={<Play_Flight />} />

      </Routes>
    </Router>
  );
};

export default App;
