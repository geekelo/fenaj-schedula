// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/home';
import Signup from './auth/signup';
import Login from './auth/login';
import { checkLoginStatus } from './redux/loginSlice';
import Navbar from './components/navbar';

function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login_auths.loggedin) || 'empty';

  useEffect(() => {
    const fetchLoginStatus = () => {
      dispatch(checkLoginStatus());
    };

    // Call fetchLoginStatus when the component mounts
    if (loginStatus === 'empty') {
      fetchLoginStatus();
    }
  }, [dispatch, loginStatus]);

  if (loginStatus !== 'empty') {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                loginStatus === 'true' ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route path="/home" element={<Home login={loginStatus} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login message={loginStatus} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
