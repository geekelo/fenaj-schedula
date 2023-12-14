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
      <form onSubmit={handleSubmit} className="form">
        <fieldset className="fieldset">
          <legend className="form-header">Login Page</legend>
          <label htmlFor="email" className="form-label">
            Email
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              id="email"
            />
          </label>
          <label htmlFor="city" className="form-label">
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
          <button type="submit" className="form-btn">Log In</button>
          <div>
            <span>Don&apos;t have an account? </span>
            <NavLink to="/signup" activeClassName="active">Sign up</NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
