import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';

const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
  },
});

export default store;
