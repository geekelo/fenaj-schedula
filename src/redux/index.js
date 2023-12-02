import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
export default store;
