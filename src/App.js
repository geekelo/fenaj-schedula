// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from 'react-router-dom';
import Home from './components/home';
import Signup from './auth/signup';
import Login from './auth/login';
import { checkLoginStatus } from './redux/loginSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login_auths.loggedin) || 'empty';

  useEffect(() => {
    const fetchLoginStatus =  () => {
      console.log('Fetching login status...');
       dispatch(checkLoginStatus());
    };

    // Call fetchLoginStatus when the component mounts
    if (loginStatus === 'empty') {
      fetchLoginStatus();
      console.log('Login status changed2:', loginStatus);
    }
  }, [dispatch, loginStatus]);

  // The useEffect below listens for changes to loginStatus
  useEffect(() => {
    console.log('Login status changed:', loginStatus);
  }, [loginStatus]);

  const signout = () => {
    localStorage.clear();
    navigate('/signup')
    // After clearing local storage, you may want to force a checkLoginStatus
    // dispatch(checkLoginStatus());
  };

  if (loginStatus !== 'empty') {
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
