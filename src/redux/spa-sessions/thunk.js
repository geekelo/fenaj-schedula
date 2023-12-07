import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:30001/api';
const url = `${baseUrl}/items`;

// Get Spa-Sessions
export const fetchSessions = createAsyncThunk(
  'sessions/fetchSessions',
  async (thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Get spa-session
export const fetchSession = createAsyncThunk(
  'sessions/fetchSession',
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Create new Session
export const createSession = createAsyncThunk(
  'sessions/createSession',
  async ({ data }, thunkAPI) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
