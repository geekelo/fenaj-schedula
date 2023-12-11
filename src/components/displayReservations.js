import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayReservations, deleteReservation } from '../redux/displayReservationsSlice';
import EachReservation from './eachReservation';

function DisplayReservations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.display_reservations.value);
  const [userLoggedin, setuserLoggedin] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (new Date().getTime() > parsedData.expirationTime) {
        // Clear expired data, set userLoggedin to false, and navigate to login
        localStorage.clear();
        setuserLoggedin(false);
        navigate('/login');
      } else {
        // The key 'userData' exists in local storage
        setuserLoggedin(true);
      }
    } else {
      // No 'userData' found in local storage, navigate to login
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (userLoggedin) {
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      // Call checkLoginStatus when the component mounts
      console.log(parsedData.extractedUserData.token);
      dispatch(displayReservations(parsedData.extractedUserData.token));
    }
  }, [userLoggedin, reservations]);

  const handleDelete = (id) => {
    if (userLoggedin) {
      console.log(id);
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      // Call checkLoginStatus when the component mounts
      const { token } = parsedData.extractedUserData;
      dispatch(deleteReservation({ id, token }));
    }
  };

  if (userLoggedin) {
    console.log(reservations);
    return (
      <div>
        <p>My Reservations</p>
        {
          reservations.map((each) => (
            <EachReservation
              key={each.id}
              eachReservation={each}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    );
  }
}

export default DisplayReservations;
