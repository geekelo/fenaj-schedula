// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Home from './components/home';

function App() {
  const [loggedInStatusInfo, setLoggedInStatusInfo] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  })

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" exact element={<Home loggedInStatusInfo={loggedInStatusInfo} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
