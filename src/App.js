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
import AddReservations from './components/addReservations';
import DisplayReservations from './components/displayReservations';
import DeleteItems from './components/deleteItems';
import './stylesheets/App.css';

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
      <div className="body">
        <Router>
          <div className="navSection">
            <Navbar />
          </div>
          <div className="pageSection">
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
              <Route path="/add-spa-session" element={<AddItem userData={userData} />} />
              <Route path="/spa-session/:id" element={<ItemDetails />} />
              <Route path="/reserve-spa-session/:id" element={<AddReservations />} />
              <Route path="/my-reservations" element={<DisplayReservations />} />
              <Route path="/delete-spa-sessions" element={<DeleteItems />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
