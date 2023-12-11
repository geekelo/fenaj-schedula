import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/add-spa-session">Add Spa Session</Link>
          </li>
          <li>
            <Link to="/my-reservations">My Reservations</Link>
          </li>
          <li>
            <Link to="/delete-spa-sessions">Delete Spa Sessions</Link>
          </li>
          <li>
            <button type="submit" onClick={signout}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
