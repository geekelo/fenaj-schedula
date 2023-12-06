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

  let loginStatus = useSelector((state) => state.login_auths.loggedin) || 'empty';
  
  useEffect(() => {
    const fetchLoginStatus = async () => {
      await dispatch(checkLoginStatus());
    };
  
    if (loginStatus === 'empty') {
      fetchLoginStatus();
    }
  }, [dispatch, loginStatus]);
  
  // Assuming checkLoginStatus updates the login status in the Redux store,
  // you can listen for changes to loginStatus using another useEffect

  console.log(loginStatus);

  const signout = ()=>{
  //   localStorage.clear();
  //   dispatch(checkLoginStatus());
  }

  if (loginStatus !== 'empty'){
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
              <button onClick={signout}>Sign Out</button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={loginStatus == true ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/signup" />
              )} />

          <Route path="/home" element={<Home login = {loginStatus} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </Router>
    </div>
  )};
}

export default App;
