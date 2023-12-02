import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: true,
    error: undefined,
    users: [],
  },
});

export default usersSlice.reducer;
