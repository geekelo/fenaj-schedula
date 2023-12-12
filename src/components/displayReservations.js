import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayReservations, deleteReservation } from '../redux/displayReservationsSlice';
import EachReservation from './eachReservation';
import '../stylesheets/eachReservation.css';

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
      if (parsedData) {
        console.log(parsedData.extractedUserData.token);
        dispatch(displayReservations(parsedData.extractedUserData.token));
      }
    }
  }, [userLoggedin, reservations]);

  const handleDelete = (id) => {
    if (userLoggedin) {
      console.log(id);
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      // Call checkLoginStatus when the component mounts
      if (parsedData) {
        const { token } = parsedData.extractedUserData || 'undefined';
        dispatch(deleteReservation({ id, token }));
      }
    }
  };

  if (userLoggedin) {
    const storedData = localStorage.getItem('userData');
    const parsedData = JSON.parse(storedData);
    const reservationList = reservations
      .filter((reservation) => reservation.user_id === parsedData.extractedUserData.id);
    return (

      <div className="reservation-main container-fluid">
        <div className="container">
          <h1>My Reservations</h1>
          <p>Here is a list of your reserved sessions:</p>
          <div className="row reservation-each desktop">
            <div className="reservation-id col-lg-1">ID</div>
            <div className="reservation-city col-lg-3">CITY</div>
            <div className="reservation-date col-lg-2">DATE</div>
            <div className="reservation-name col-lg-3">SESSION</div>
            <div className="reservation-delete col-lg-3">ACTION</div>
          </div>
          {
            reservationList.map((each) => (
              <EachReservation
                key={each.id}
                eachReservation={each}
                handleDelete={handleDelete}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default DisplayReservations;
