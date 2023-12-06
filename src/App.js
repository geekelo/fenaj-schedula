// src/App.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/home';
import Signup from './auth/signup';
import Login from './auth/login';

function App() {
  const message = useSelector((state) => state.signup_auths.value);

  const [loggedInStatusInfo, setLoggedInStatusInfo] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  useEffect(() => {
    setLoggedInStatusInfo((loggedInStatusInfo) => ({
      ...loggedInStatusInfo,
      loggedInStatus:
        message.status === 'created' ? 'LOGGED_IN' : 'NOT_LOGGED_IN',
    }));
  }, [message.status]);


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={loggedInStatusInfo.loggedInStatus === 'LOGGED_IN' ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/signup" />
              )} />

          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup loggedInStatusInfo={loggedInStatusInfo} />} />
          <Route path="/login" element={<Login loggedInStatusInfo={loggedInStatusInfo} />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
