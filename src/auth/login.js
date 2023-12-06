// signup.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.login_auths.value);

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userInfo));
    message.logged_in === true ? navigate('/home') : navigate('/login');
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
