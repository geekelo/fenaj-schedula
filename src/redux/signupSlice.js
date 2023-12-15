// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet',
};

export const loginUser = createAsyncThunk(
  'user/createUser',
  async (loginData) => {
    try {
      const response = await fetch('https://fenaj-schedula-api.onrender.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: loginData }), // Wrap userData in a "user" key
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const extractedUserData = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        token: data.token,
      };

      // Store the data along with a timestamp
      const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 24 hours
      const dataToStore = {
        extractedUserData,
        expirationTime,
      };

      localStorage.setItem('userData', JSON.stringify(dataToStore));

      return data; // You might want to adjust this based on your API response structure
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { dispatch }) => {
    try {
      const response = await fetch('https://fenaj-schedula-api.onrender.com/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }), // Wrap userData in a "user" key
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.clear();
      const loginData = {
        email: userData.email,
        password: userData.password,
      };
      dispatch(loginUser(loginData));
      return data; // You might want to adjust this based on your API response structure
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
        status: 'done',
      }))
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default signupSlice.reducer;
