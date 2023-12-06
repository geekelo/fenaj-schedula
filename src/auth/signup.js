// signup.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../redux/signupSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.signup_auths.value);

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userInfo));
    message.status === 'created' ? navigate('/home') : navigate('/signup');
  }

  const handleChange = (e) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
    console.log(userInfo);
  }

  useEffect(() => {
    console.log(userInfo);
  },[userInfo]);

  return (
    <div>
      <h2>Registration goes here</h2>
      <form onSubmit={handleSubmit}>

      <input
          type="text"
          name="username"
          placeholder="username"
          value={userInfo.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={userInfo.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="confirm password"
          value={userInfo.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      
    </div>
  );
};

export default Signup;