import React from 'react';
import { useSelector } from 'react-redux';

function Home() {

  const signupStatus = useSelector((state) => state.signup_auths.value);
  const loginStatus = useSelector((state) => state.login_auths.value);
  let currentStatus;
  if (signupStatus === 'Created' || loginStatus === 'Created'){
    currentStatus = 'Logged In';
  }
  else {
    currentStatus = 'Not Logged In';
  }

  return (
    <div>
      <p>Hello</p>
      <p> STATUS: { currentStatus }</p>
    </div>
  );
}

export default Home;
