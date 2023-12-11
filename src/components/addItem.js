import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewItem } from '../redux/addItemSlice';

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
        <p>Hello</p>
        <p>
          STATUS:
        </p>
        <h1>Add Item</h1>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={item.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="item-name">
          Your Text:
          <textarea
            value={item.description}
            id="item-name"
            name="description"
            onChange={handleChange}
          />
        </label>

        <input
          type="number"
          name="duration"
          placeholder="duration"
          value={item.duration}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="spa_session_fee"
          placeholder="spa session fee"
          value={item.spa_session_fee}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="registration_fee"
          placeholder="registration fee"
          value={item.registration_fee}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="total_amount_payable"
          placeholder="total amount payable"
          value={item.total_amount_payable}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="item image"
          value={item.image}
          onChange={handleChange}
          required
        />

        <button type="submit" onClick={handleSubmit}> Add Item  </button>
      </div>
    );
  }
}

export default AddItem;
