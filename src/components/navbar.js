import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const signout = (e) => {
    e.preventDefault();
    // Clear local storage
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
            <button type="submit" onClick={signout}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
