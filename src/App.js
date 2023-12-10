// src/App.js
import React, { useEffect, useState } from 'react';
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
import AddItem from './components/addItem';
import ItemDetails from './components/itemDetails';

function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login_auths.loggedin);

  const [userData, setUserData] = useState({});

  const retrieveUserData = () => {
    // Retrieve the content from localStorage
    const userDataJSON = localStorage.getItem('userData');

    // Parse the JSON content
    const storedUserData = JSON.parse(userDataJSON);
    console.log(storedUserData.extractedUserData);
    return storedUserData.extractedUserData || {};
  };

  useEffect(() => {
    const fetchLoginStatus = () => {
      dispatch(checkLoginStatus());
    };

    // Call fetchLoginStatus when the component mounts
    if (loginStatus === 'empty') {
      fetchLoginStatus();
    }

    if (loginStatus === 'true') {
      setUserData(retrieveUserData());
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
            <Route path="/additem" element={<AddItem />} />
            <Route path="/login" element={<Login message={loginStatus} />} />
            <Route path="/additem" element={<AddItem userData={userData} />} />
            <Route path="/itemdetails/:id" element={<ItemDetails />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
