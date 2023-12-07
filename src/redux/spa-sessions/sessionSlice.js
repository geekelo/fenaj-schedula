import { createSlice } from '@reduxjs/toolkit';

import { fetchSessions, fetchSession, createSession } from './thunk';

const initialState = {
  sessions: [],
  session: null,
  isLoading: true,
  error: false,
  errMsg: '',
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch sessions
      .addCase(fetchSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      })

      // Fetch session
      .addCase(fetchSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.session = action.payload;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      })

      // Create session
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = [...state.sessions, action.payload];
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },
});

export default sessionsSlice.reducer;
