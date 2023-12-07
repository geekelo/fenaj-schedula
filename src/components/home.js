import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus } from '../redux/loginSlice';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(checkLoginStatus());
  }, [dispatch]);
  const signupStatus = useSelector((state) => state.signup_auths.signedup);
  const loginStatus = useSelector((state) => state.login_auths.loggedin);

  const currentStatus = signupStatus === true || loginStatus === 'true' ? 'LOGGED_IN' : 'NOT_LOGGED_IN';

  return (
    <div>
      <p>Hello</p>
      <p>
        STATUS:
        { currentStatus }
      </p>
    </div>
  );
}

export default Home;
