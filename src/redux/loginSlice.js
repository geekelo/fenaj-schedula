// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet'
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData) => {
    try {
      const response = await fetch('http://localhost:30001/sessions', {
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


const loginSlice = createSlice({
  name: 'login_auths',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        value: action.payload,
        status: 'done'
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default loginSlice.reducer;
