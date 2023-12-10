import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';
import addItemSlice from './addItemSlice';
import displayItemsSlice from './displayItemSlice';

const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
    login_auths: loginSlice,
    add_new_item: addItemSlice,
    display_items: displayItemsSlice,
  },
});

export default store;
