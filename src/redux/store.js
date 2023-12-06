import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';

const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
    login_auths: loginSlice,
  },
});

export default store;
