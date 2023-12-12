// signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/loginSlice';

function Login() {
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
    if (message === 'true') {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };
  // message === 'true' ? navigate('/home') : navigate('/login');

  const handleChange = (e) => {
    e.preventDefault();

    setUserInfo((userInfo) => ({
      ...userInfo,
      [e.target.name]: e.target.value,
    }));
  };

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
      <div>
        <span>Don&apos;t have an account? </span>
        <NavLink to="/signup" activeClassName="active">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Login;
