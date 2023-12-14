// addItemSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet',
};

export const addNewItem = createAsyncThunk(
  'user/additem',
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
  reducers: {},
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
