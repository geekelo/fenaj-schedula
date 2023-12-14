import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewItem } from '../redux/addItemSlice';
import '../stylesheets/form.css';

function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLoggedin, setuserLoggedin] = useState(false);
  const [error, setErrror] = useState(false);

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
    setErrror('');

    if (!item.name) {
      setErrror('Name is required');
    } else if (!item.description) {
      setErrror('Description is required');
    } else if (!item.duration) {
      setErrror('Duration is required');
    } else if (!item.image) {
      setErrror('Image is required');
    } else if (!item.spa_session_fee) {
      setErrror('Spa Session fee is required');
    } else if (!item.registration_fee) {
      setErrror('Registration fee is required');
    } else if (!item.total_amount_payable) {
      setErrror('Total amount payable is required');
    } else if (!item.deposit) {
      setErrror('Deposit payable is required');
    } else {
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      await dispatch(addNewItem({ itemData: item, token: parsedData.extractedUserData.token }));
      navigate('/home');
    }
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
        <form className="form">
          <fieldset className="fieldset">
            <legend className="form-header">Add Spa Session</legend>

            {
              error && <div className="errorMessage">{error}</div>
            }
            <label htmlFor="name" className="form-label">
              Name
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="name"
                value={item.name}
                onChange={handleChange}
                id="name"
                required
              />
            </label>

            <label htmlFor="description" className="form-label">
              Description
              <textarea
                value={item.description}
                id="description"
                name="description"
                onChange={handleChange}
                placeholder="Your description here..."
                className="form-textarea"
              />
            </label>
            <label htmlFor="deposit" className="form-label">
              {' '}
              Deposit
              <input
                className="form-input"
                type="number"
                name="deposit"
                placeholder="deposit"
                value={item.deposit}
                onChange={handleChange}
                id="deposit"
                required
              />
            </label>
            <label htmlFor="duration" className="form-label">
              {' '}
              Duration
              <input
                className="form-input"
                type="number"
                name="duration"
                placeholder="duration"
                value={item.duration}
                onChange={handleChange}
                id="duration"
                required
              />
            </label>
            <label htmlFor="spa_session_fee" className="form-label">
              {' '}
              Spa Session Fee
              <input
                className="form-input"
                type="number"
                name="spa_session_fee"
                placeholder="spa session fee"
                value={item.spa_session_fee}
                onChange={handleChange}
                id="spa_session_fee"
                required
              />
            </label>
            <label htmlFor="registration_fee" className="form-label">
              {' '}
              Registration Fee
              <input
                className="form-input"
                type="number"
                name="registration_fee"
                placeholder="registration fee"
                value={item.registration_fee}
                onChange={handleChange}
                id="registration_fee"
                required
              />
            </label>
            <label htmlFor="total_amount_payable" className="form-label">
              {' '}
              Total Amount Payable

              <input
                className="form-input"
                type="number"
                name="total_amount_payable"
                placeholder="total amount payable"
                value={item.total_amount_payable}
                onChange={handleChange}
                id="total_amount_payable"
                required="required"
              />
            </label>
            <label htmlFor="image" className="form-label">
              {' '}
              Item Image URL
              <input
                className="form-input"
                type="text"
                name="image"
                placeholder="item image"
                value={item.image}
                onChange={handleChange}
                required="required"
              />
            </label>
            <button type="submit" onClick={handleSubmit} className="form-btn">Add Session</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddItem;
