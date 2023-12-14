import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';
import addItemSlice from './addItemSlice';
import displayItemsSlice from './displayItemSlice';
import addResevationSlice from './addResevationSlice';
import displayReservationsSlice from './displayReservationsSlice';

const store = configureStore({
  reducer: {
    signup_auths: signupSlice,
    login_auths: loginSlice,
    add_new_item: addItemSlice,
    display_items: displayItemsSlice,
    add_reservation: addResevationSlice,
    display_reservations: displayReservationsSlice,
  },
});

export default store;
