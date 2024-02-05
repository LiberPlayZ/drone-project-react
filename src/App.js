import { React, useEffect } from 'react';
import './App.css';
import HistoryComponent from './history_component/HistoryComponent';
import Play_Flight from './play_Flight/Play_flight_simulation';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from'./login_register/LoginPage';

import { checkCookieExist } from './login_register/checkCookie';
import RegisterPage from './login_register/RegisterPage';



const isAuthenticated = checkCookieExist();


const NavigateToLogin = ({ routeName }) => { // component to render login at first page .
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated != null) {
      navigate(routeName);
    }
    else {
      localStorage.removeItem('session_token');
      navigate('/LoginPage');
    }
  }, [navigate]);

  return null; // This component doesn't render anything, it just performs the navigation
}



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<NavigateToLogin routeName={'/flightsHistory'} />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/flightsHistory' element={<HistoryComponent />} />
        <Route path='/flightSimulation/:flightId' element={<Play_Flight />} />

      </Routes>
    </Router>
  );
};

export default App;
