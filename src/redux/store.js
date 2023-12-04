import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // greetings: greetingSlice,
  },
});

export default store;
