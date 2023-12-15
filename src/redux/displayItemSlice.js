// dislayItemSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const displayItems = createAsyncThunk('user/display_items', async () => {
  try {
    const response = await fetch('https://fenaj-schedula-api.onrender.com/api/v1/items', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Something went wrong with creating the user');
  }
});

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (payload) => {
    const { id, token } = payload;

    try {
      const response = await fetch(
        `https://fenaj-schedula-api.onrender.com/api/v1/items/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // displayItems();
    } catch (error) {
      throw new Error('Something went wrong with deleting the item');
    }
  },
);

const displayItemsSlice = createSlice({
  name: 'display_items',
  initialState,
  reducers: {
    checkLoginStatus: (state) => {
      const key = 'loginData';
      const storedData = localStorage.getItem(key);
      if (localStorage.getItem(key) !== null) {
        const parsedData = JSON.parse(storedData);
        if (new Date().getTime() > parsedData.expirationTime) {
          localStorage.removeItem(key);
          return {
            ...state,
            loggedin: 'false',
          };
        }

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
      .addCase(displayItems.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(displayItems.fulfilled, (state, action) => ({
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(displayItems.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { checkLoginStatus } = displayItemsSlice.actions;
export default displayItemsSlice.reducer;
