// signup.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.login_auths.loggedin);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(userInfo));
    message === 'true' ? navigate('/home') : navigate('/login');
    console.log(message)
  };


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
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>

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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
