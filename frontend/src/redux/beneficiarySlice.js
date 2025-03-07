// src/redux/beneficiariesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api/beneficiaries/beneficiaries';

// Create a beneficiary
export const createBeneficiary = createAsyncThunk(
  'beneficiaries/createBeneficiary',
  async ({ name, story }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.post(
        API_URL,
        { name, story },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      return response.data; // { message, beneficiary: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Beneficiary creation failed'
      );
    }
  }
);

// Fetch all beneficiaries for the charity
export const fetchBeneficiaries = createAsyncThunk(
  'beneficiaries/fetchBeneficiaries',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return response.data.beneficiaries; // list of beneficiary objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch beneficiaries'
      );
    }
  }
);

// Update a beneficiary
export const updateBeneficiary = createAsyncThunk(
  'beneficiaries/updateBeneficiary',
  async ({ beneficiaryId, name, story }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.put(
        `${API_URL}/${beneficiaryId}`,
        { name, story },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      return response.data; // { message, beneficiary: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update beneficiary'
      );
    }
  }
);

// Delete a beneficiary
export const deleteBeneficiary = createAsyncThunk(
  'beneficiaries/deleteBeneficiary',
  async (beneficiaryId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.delete(`${API_URL}/${beneficiaryId}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return { beneficiaryId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete beneficiary'
      );
    }
  }
);

const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState: {
    beneficiaries: [],
    status: 'idle',
    error: null,
    message: '',
  },
  reducers: {
    clearBeneficiaryMessage(state) {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create beneficiary
      .addCase(createBeneficiary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBeneficiary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.beneficiaries.push(action.payload.beneficiary);
      })
      .addCase(createBeneficiary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch beneficiaries
      .addCase(fetchBeneficiaries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeneficiaries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.beneficiaries = action.payload;
      })
      .addCase(fetchBeneficiaries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update beneficiary
      .addCase(updateBeneficiary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBeneficiary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        const updated = action.payload.beneficiary;
        const index = state.beneficiaries.findIndex(b => b.id === updated.id);
        if (index !== -1) {
          state.beneficiaries[index] = updated;
        }
      })
      .addCase(updateBeneficiary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete beneficiary
      .addCase(deleteBeneficiary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBeneficiary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.beneficiaries = state.beneficiaries.filter(
          b => b.id !== action.payload.beneficiaryId
        );
      })
      .addCase(deleteBeneficiary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearBeneficiaryMessage } = beneficiariesSlice.actions;
export default beneficiariesSlice.reducer;



