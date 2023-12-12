import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewItem } from '../redux/addItemSlice';
import '../stylesheets/addItem.css';

function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const [item, setItem] = useState({
    name: '',
    description: '',
    image: '',
    deposit: 0.00,
    spa_session_fee: 0.00,
    registration_fee: 0.00,
    total_amount_payable: 0,
    duration: 0.00,
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
      setItem((prevItem) => ({ ...prevItem, user_id: userId }));
    }
  }, [userLoggedin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('userData');
    const parsedData = JSON.parse(storedData);
    await dispatch(addNewItem({ itemData: item, token: parsedData.extractedUserData.token }));
    navigate('/home');
  };

  const handleChange = (e) => {
    setItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  if (userLoggedin) {
    return (
      <div>
        <form>
          <h1>Add Session</h1>
          <label htmlFor="name">
            {' '}
            Name:
            <input
              type="text"
              name="name"
              placeholder="name"
              value={item.name}
              onChange={handleChange}
              id="name"
              required
            />
          </label>

          <label htmlFor="description">
            Description:
            <textarea
              value={item.description}
              id="description"
              name="description"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="duration">
            {' '}
            Duration
            <input
              type="number"
              name="duration"
              placeholder="duration"
              value={item.duration}
              onChange={handleChange}
              id="duration"
              required
            />
          </label>
          <label htmlFor="spa_session_fee">
            {' '}
            Spa Session Fee
            <input
              type="number"
              name="spa_session_fee"
              placeholder="spa session fee"
              value={item.spa_session_fee}
              onChange={handleChange}
              id="spa_session_fee"
              required
            />
          </label>
          <label htmlFor="registration_fee">
            {' '}
            Registration Fee
            <input
              type="number"
              name="registration_fee"
              placeholder="registration fee"
              value={item.registration_fee}
              onChange={handleChange}
              id="registration_fee"
              required
            />
          </label>
          <label htmlFor="total_amount_payable">
            {' '}
            Total Amount Payable

            <input
              type="number"
              name="total_amount_payable"
              placeholder="total amount payable"
              value={item.total_amount_payable}
              onChange={handleChange}
              id="total_amount_payable"
              required
            />
          </label>
          <input
            type="text"
            name="image"
            placeholder="item image"
            value={item.image}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>Add Item</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
