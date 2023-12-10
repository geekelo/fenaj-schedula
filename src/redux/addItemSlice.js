// addItemSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet',
};

export const addNewItem = createAsyncThunk(
  'user/loginUser',
  async (payload) => {
    const { itemData, token } = payload;
    try {
      const response = await fetch('http://localhost:30001/api/v1/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item: itemData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

const addItemSlice = createSlice({
  name: 'add_new_item',
  initialState,
  reducers: {
    checkLoginStatus: (state) => {
      const key = 'loginData';
      const storedData = localStorage.getItem(key);
      console.log(storedData);
      if (localStorage.getItem(key) !== null) {
        // Check if the data has expired
        const parsedData = JSON.parse(storedData);
        if (new Date().getTime() > parsedData.expirationTime) {
          localStorage.removeItem(key); // Clear expired data
          return {
            ...state,
            loggedin: 'false',
          };
        }
        // The key 'userData' exists in local storage
        return {
          ...state,
          loggedin: 'true',
        };
      }
      return {
        ...state,
        loggedin: 'false',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewItem.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addNewItem.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        value: action.payload,
        status: 'done',
      }))
      .addCase(addNewItem.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { checkLoginStatus } = addItemSlice.actions;
export default addItemSlice.reducer;
