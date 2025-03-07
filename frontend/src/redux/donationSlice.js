import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api/donations';

// Thunk to create a donation
export const createDonation = createAsyncThunk(
  'donation/createDonation',
  async ({ amount, charity_id, is_recurring, is_anonymous }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.post(
        `${API_URL}/donations`,
        { amount, charity_id, is_recurring, is_anonymous },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      // Expect backend to return { message: 'Donation created successfully', donation: donation.to_dict() }
      return response.data.donation;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Donation creation failed');
    }
  }
);

// Thunk to fetch donations
export const fetchDonations = createAsyncThunk(
  'donation/fetchDonations',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(`${API_URL}/donations`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      // Expect backend to return { message: 'Donations retrieved successfully', donations: [ ... ] }
      return response.data.donations;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch donations');
    }
  }
);

const initialState = {
  donations: [],
  status: 'idle',
  error: null,
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle create donation
      .addCase(createDonation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Append the newly created donation to the list
        state.donations.push(action.payload);
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetch donations
      .addCase(fetchDonations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations = action.payload;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default donationSlice.reducer;
