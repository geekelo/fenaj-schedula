// addReservationSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
  status: 'idle',
  error: 'no errors yet',
};

export const addReservation = createAsyncThunk(
  'user/addReservation',
  async (payload) => {
    const { reserveData, token } = payload;
    try {
      const response = await fetch('http://localhost:30001/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reservation: reserveData }),
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

const addReservationSlice = createSlice({
  name: 'add_reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReservation.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(addReservation.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        value: action.payload,
        status: 'done',
      }))
      .addCase(addReservation.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default addReservationSlice.reducer;
