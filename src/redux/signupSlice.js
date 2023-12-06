// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  signedup: false,
  status: 'idle',
  error: 'no errors yet'
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

      
      localStorage.clear();
      const extractedUserData = {
        id: data.user.id,
        email: data.user.email
      }

    // Store the data along with a timestamp
    const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 24 hours
    const dataToStore = {
      extractedUserData,
      expirationTime,
    };

    localStorage.setItem('userData', JSON.stringify(dataToStore));
    // login
    const loginStatus = {
      login: true,
      expirationTime,
    };

localStorage.setItem('loginData', JSON.stringify(loginStatus));
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
      .addCase(createUser.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        value: action.payload,
        signedup: true,
        status: 'done'
      }))
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        signedup: false,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
