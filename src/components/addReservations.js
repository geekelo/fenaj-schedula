import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../redux/addResevationSlice';

function AddReservations() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.add_reservation.status);
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

  const [reserveInfo, setReserveInfo] = useState({
    city: '',
    date: '',
    item_id: id,
    user_id: 0, // Default value, will be updated in useEffect
  });

  const retrieveUserData = () => {
    const storedData = localStorage.getItem('userData');
    const parsedData = JSON.parse(storedData);
    // The key 'userData' exists in local storage
    return parsedData.extractedUserData.id;
  };

  useEffect(() => {
    // Update user_id in item when userLoggedin changes
    if (userLoggedin) {
      const userId = retrieveUserData();
      setReserveInfo((prevItem) => ({ ...prevItem, user_id: userId }));
    }
  }, [userLoggedin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('userData');
    const parsedData = JSON.parse(storedData);
    console.log(parsedData.extractedUserData.token);
    await dispatch(addReservation({
      reserveData: reserveInfo,
      token: parsedData.extractedUserData.token,
    }));
  };

  useEffect(() => {
    if (status === 'done') {
      navigate('/home');
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    setReserveInfo((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  if (userLoggedin) {
    return (
      <div>
        <h2>Reserve Spa Session</h2>
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="city"
            placeholder="city"
            value={reserveInfo.city}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            placeholder="date"
            value={reserveInfo.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Done</button>
        </form>
      </div>
    );
  }
}

export default AddReservations;
