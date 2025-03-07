import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api/charities';

// Thunk to create a new charity
export const createCharity = createAsyncThunk(
  'charity/createCharity',
  async ({ name, description }, { getState, rejectWithValue }) => {
    const { token, userInfo } = getState().auth;
    try {
      const response = await axios.post(
        `${API_URL}/charities`,
        { name, description },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      // Expecting backend to return { message, charity_id, status }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Charity creation failed'
      );
    }
  }
);

// Thunk to fetch all charities
export const fetchCharities = createAsyncThunk(
  'charity/fetchCharities',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${API_URL}/charities`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      // Expecting { message, charities: [ { id, name, description, status } ] }
      return response.data.charities;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch charities'
      );
    }
  }
);

// Thunk to get non-anonymous donors for a charity
export const fetchNonAnonymousDonors = createAsyncThunk(
  'charity/fetchNonAnonymousDonors',
  async (charityId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${API_URL}/charities/${charityId}/donors`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      // Expecting { message, donors: [...] }
      return { charityId, donors: response.data.donors };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch non-anonymous donors'
      );
    }
  }
);

// Thunk to get anonymous donations for a charity
export const fetchAnonymousDonations = createAsyncThunk(
  'charity/fetchAnonymousDonations',
  async (charityId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${API_URL}/charities/${charityId}/anonymous-donations`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      // Expecting { message, anonymous_donations: [...] }
      return { charityId, anonymousDonations: response.data.anonymous_donations };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch anonymous donations'
      );
    }
  }
);

// Thunk to get total donations for a charity
export const fetchTotalDonations = createAsyncThunk(
  'charity/fetchTotalDonations',
  async (charityId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${API_URL}/charities/${charityId}/total-donations`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      // Expecting { message, total_donations: <number> }
      return { charityId, totalDonations: response.data.total_donations };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch total donations'
      );
    }
  }
);

const initialState = {
  charities: [],
  donorsByCharity: {}, // key: charityId, value: donor list
  anonymousDonationsByCharity: {}, // key: charityId, value: array of donation amounts
  totalDonationsByCharity: {}, // key: charityId, value: total donation amount
  status: 'idle',
  error: null,
  message: '',
};

const charitySlice = createSlice({
  name: 'charity',
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create charity
      .addCase(createCharity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCharity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        // Optionally add the new charity to the list
        state.charities.push({
          id: action.payload.charity_id,
          status: action.payload.status,
          // The backend might not return description, name here so fetchCharities could refresh the list.
        });
      })
      .addCase(createCharity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch charities
      .addCase(fetchCharities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.charities = action.payload;
      })
      .addCase(fetchCharities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch non-anonymous donors
      .addCase(fetchNonAnonymousDonors.fulfilled, (state, action) => {
        const { charityId, donors } = action.payload;
        state.donorsByCharity[charityId] = donors;
      })
      // Fetch anonymous donations
      .addCase(fetchAnonymousDonations.fulfilled, (state, action) => {
        const { charityId, anonymousDonations } = action.payload;
        state.anonymousDonationsByCharity[charityId] = anonymousDonations;
      })
      // Fetch total donations
      .addCase(fetchTotalDonations.fulfilled, (state, action) => {
        const { charityId, totalDonations } = action.payload;
        state.totalDonationsByCharity[charityId] = totalDonations;
      });
  },
});

export const { clearMessage } = charitySlice.actions;
export default charitySlice.reducer;
