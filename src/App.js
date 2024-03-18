import { React, useEffect } from 'react';
import './App.css';
import HistoryComponent from './history_component/HistoryComponent';
import PlayFlight from './play_Flight/PlayFlight';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from'./login_register/LoginPage';

import { PostRequestHandler } from './backend_handlers/PostRequestHandler';
import RegisterPage from './login_register/RegisterPage';



const isAuthenticatedResponse =  await PostRequestHandler('/checkLogin');


const NavigateToLogin = ({ routeName }) => { // component to render login at first page .
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticatedResponse.ok) {
      console.log('ok');
      navigate(routeName);
    }
    else {
      navigate('/LoginPage');
    }
  }, [navigate,routeName]);

  return null; // This component doesn't render anything, it just performs the navigation
}



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<NavigateToLogin routeName={'/flightsHistory'} />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/addUser' element={<RegisterPage/>}/>
        <Route path='/flightsHistory' element={<HistoryComponent />} />
        <Route path='/flightSimulation/:flightId' element={<PlayFlight />} />

      </Routes>
    </Router>
  );
};

export default App;
