// signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  loggedin: false,
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

localStorage.setItem('userData', JSON.stringify(loginStatus));

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
  reducers: {

    checkLoginStatus: (state) => {

      const key = 'userLoginStatus';
  
        const storedData = localStorage.getItem(key);
        if (!storedData) {
          return false;
        }
        const parsedData = JSON.parse(storedData);
        const { login, expiration_time } = parsedData;
    
        
        // Check if the data has expired
        if (new Date().getTime() > expiration_time) {
          localStorage.removeItem(key); // Clear expired data
          return false;
        }
        
        if (login) {
          return {
            ...state,
          loggedin: true
        }
        }
      },
    

    updateStatus: async(state) => {
      try {
        const response = await fetch('http://localhost:30001/sessions/logged_in', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
    
        if (data.logged_in) {

          const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 24 hours
          const loginStatus = {
            login: true,
            expirationTime,
          };

    localStorage.setItem('userData', JSON.stringify(loginStatus));
          
          return {
            ...state,
            value: data,
            loggedin: true
          };
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    },
  },
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
        loggedin: false,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { checkLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;
