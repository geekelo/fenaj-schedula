/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';
import '../stylesheets/navbar.css';
import logo from '../assets/logo.png';
import logomobile from '../assets/logomobile.png';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signout = async (e) => {
    e.preventDefault();
    toggleMenu();

    // Clear local storage
    localStorage.clear();
    // Navigate to the "/signup" route
    navigate('/signup');
  };

  // Rest of your component...

  return (
    <div>
      <nav className="navbar">
        <div
          role="button"
          tabIndex={0}
          className="mobile-menu-icon"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              toggleMenu();
            }
          }}
        >
          <div className="logomobilecont"><img src={logomobile} alt="logo" className="logomobile" width="150px" /></div>
          {!isMenuOpen ? (
            <div className="mobileIcons">
              <div role="button" tabIndex={0} className="hamburger-icon-open">&#9776;</div>
              <div role="button" tabIndex={0} className="close-icon-close">&times;</div>
            </div>
          ) : (
            <div className="mobileIcons">
              <div role="button" tabIndex={0} className="hamburger-icon-close">&#9776;</div>
              <div role="button" tabIndex={0} className="close-icon-open">&times;</div>
            </div>
          )}
        </div>
        <ul className={`menuContainer  ${isMenuOpen ? 'menu-open' : ''}`}>
          <img src={logo} alt="logo" className="logoImage" />
          <li className="menuItems">
            <NavLink to="/home" onClick={toggleMenu} className="menuLinks" activeClassName="active">Home</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/add-spa-session" onClick={toggleMenu} className="menuLinks" activeClassName="active">Add Session</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/my-reservations" onClick={toggleMenu} className="menuLinks" activeClassName="active">Reservations</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/delete-spa-sessions" onClick={toggleMenu} className="menuLinks" activeClassName="active">Delete Sessions</NavLink>
          </li>
          <li className="menuItems">
            <NavLink to="/login" className="menuLinks" onClick={toggleMenu} activeClassName="active">Login</NavLink>
          </li>
          <li className="menuItems">
            <button type="submit" className="menuLinks" onClick={signout}>Sign Out</button>
          </li>
        </ul>

        <div className="footer">
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

// export default Navbar;
