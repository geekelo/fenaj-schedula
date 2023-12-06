// src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import Home from './components/home';
import Signup from './auth/signup';
import Login from './auth/login';
import { checkLoginStatus } from './redux/loginSlice';

function App() {
  const dispatch = useDispatch();

  const signupStatus = useSelector((state) => state.signup_auths.signedup) || 'not_created';
  const loginStatus = useSelector((state) => state.login_auths.loggedin);

  let currentStatus = signupStatus === true || loginStatus === false ? true : false;
  
  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(checkLoginStatus);
  }, [dispatch]); 

  const [loggedInStatusInfo, setLoggedInStatusInfo] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  useEffect(() => {
    setLoggedInStatusInfo((loggedInStatusInfo) => ({
      ...loggedInStatusInfo,
      loggedInStatus:
      currentStatus === true ? 'LOGGED_IN' : 'NOT_LOGGED_IN',
    }));
  }, [currentStatus]);


  return (
    <div>
      <Router>
      <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/">Base</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={loggedInStatusInfo.loggedInStatus === 'LOGGED_IN' ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/signup" />
              )} />

          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
