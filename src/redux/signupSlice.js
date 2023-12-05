// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
    password_confirmation: ''
  },
  status: 'idle',
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    try {
      const response = await fetch('http://localhost:30001/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),  // Wrap userData in a "user" key
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      return data;  // You might want to adjust this based on your API response structure
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);


const signupSlice = createSlice({
  name: 'signup_auths',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(createUser.fulfilled, (state, action) => {
        // Access userData from the action.payload
        const userData = action.payload;

        // Update the state with the received user data
        state.user = userData;
        state.status = 'done';
      })
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
