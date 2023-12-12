/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import axios from 'axios';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';
import '../stylesheets/navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();

  const signout = async (e) => {
    e.preventDefault();

    // Clear local storage
    try {
      const response = await axios.delete('http://localhost:30001/logout', { withCredentials: true });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Logout error', error);
    }

    localStorage.clear();
    // Navigate to the "/signup" route
    navigate('/signup');
  };

  // Rest of your component...

  return (
    <div>
      <nav className="navbar">
        <ul className="menuContainer">
          <img src={logo} alt="logo" className="logoImage" />
          <li className="menuItems">
            <NavLink to="/home" className="menuLinks" activeClassName="active">Home</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/add-spa-session" className="menuLinks" activeClassName="active">Add Session</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/my-reservations" className="menuLinks" activeClassName="active">Reservations</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/delete-spa-sessions" className="menuLinks" activeClassName="active">Delete Sessions</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/login" className="menuLinks" activeClassName="active">Login</NavLink>
          </li>
          <li className="menuItems">
            <button type="submit" className="menuLinks" onClick={signout}>Sign Out</button>
          </li>
        </ul>

        <div>
          <div className="iconsSection">
            <p><FaFacebook /></p>
            <p><FaTwitter /></p>
            <p><FaInstagram /></p>
            <p><FaEnvelope /></p>
          </div>
          <p>© Copyrights 2023</p>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
