import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api';

// Read token and user info from localStorage if they exist
const token = localStorage.getItem('token') || null;
const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  token,
  userInfo,
  status: 'idle',
  error: null,
};

// Thunk for user registration
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Thunk for user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout clears both state and localStorage
    logout(state) {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Store token and user info in state and localStorage
        state.token = action.payload.token;
        state.userInfo = {
          id: action.payload.user_id,
          role: action.payload.role,
        };
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: action.payload.user_id,
            role: action.payload.role,
          })
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Store token and user info in state and localStorage
        state.token = action.payload.token;
        state.userInfo = {
          id: action.payload.user_id,
          role: action.payload.role,
        };
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: action.payload.user_id,
            role: action.payload.role,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
