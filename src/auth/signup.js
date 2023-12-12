// signup.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/signupSlice';
import '../stylesheets/form.css';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.signup_auths.status);

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(userInfo));
  };

  useEffect(() => {
    // Check the message in the effect
    if (message === 'done') {
      navigate('/home');
    } else if (message === 'failed') {
      // Handle failed registration, e.g., display an error message
      console.error('Registration failed');
    }
  }, [message]);

  const handleChange = (e) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    console.log(userInfo);
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <fieldset className="fieldset">
          <legend className="form-header">Registration goes here</legend>
          <label htmlFor="username" className="form-label">
            {' '}
            Name
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="username"
              value={userInfo.username}
              onChange={handleChange}
              required
              id="username"
            />
          </label>
          <label htmlFor="email" className="form-label">
            {' '}
            Email
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password" className="form-label">
            {' '}
            Password
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="password"
              value={userInfo.password}
              onChange={handleChange}
              required
              id="password"
            />
          </label>
          <label htmlFor="c-password" className="form-label">
            {' '}
            Password Confirmation
            <input
              className="form-input"
              type="password"
              name="password_confirmation"
              placeholder="confirm password"
              value={userInfo.password_confirmation}
              onChange={handleChange}
              required
              id="c-password"
            />
          </label>
          <button type="submit" className="form-btn">Sign Up</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Signup;
