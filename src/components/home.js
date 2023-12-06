import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Home() {

  const loginStatus = useSelector((state) => state.login_auths.loggedin);

  let currentStatus = signupStatus === true || loginStatus === true ? 'LOGGED_IN' : 'NOT_LOGGED_IN';

  console.log(loginStatus)

  return (
    <div>
      <p>Hello</p>
      <p> STATUS: { currentStatus }</p>
    </div>
  );
}

export default Home;
