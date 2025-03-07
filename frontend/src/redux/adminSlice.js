// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = "https://donation-platform-8n9f.onrender.com/api/admin";

// // Fetch all users
// export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/users`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Error fetching users");
//     }
// });

// // Fetch pending charities
// export const fetchPendingCharities = createAsyncThunk("admin/fetchPendingCharities", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/charities/pending`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Error fetching charities");
//     }
// });

// // Approve/Reject Charity
// export const updateCharityStatus = createAsyncThunk(
//     "admin/updateCharityStatus",
//     async ({ charityId, status }, { rejectWithValue }) => {
//         try {
//             await axios.put(`${BASE_URL}/approve_charity/${charityId}`, { status }, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             return { charityId, status };
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Error updating charity status");
//         }
//     }
// );

// // Delete User
// export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
//     try {
//         await axios.delete(`${BASE_URL}/delete_user/${userId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         return userId;
//     } catch (error) {
//         return rejectWithValue(error.response?.data || "Error deleting user");
//     }
// });

// const adminSlice = createSlice({
//     name: "admin",
//     initialState: {
//         users: [],
//         pendingCharities: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUsers.pending, (state) => { state.loading = true; })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.users = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(fetchPendingCharities.pending, (state) => { state.loading = true; })
//             .addCase(fetchPendingCharities.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pendingCharities = action.payload;
//             })
//             .addCase(fetchPendingCharities.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(updateCharityStatus.fulfilled, (state, action) => {
//                 const { charityId, status } = action.payload;
//                 state.pendingCharities = state.pendingCharities.map((charity) =>
//                     charity.id === charityId ? { ...charity, status } : charity
//                 );
//             })
//             .addCase(deleteUser.fulfilled, (state, action) => {
//                 state.users = state.users.filter((user) => user.id !== action.payload);
//             });
//     },
// });

// export default adminSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://donation-platform-8n9f.onrender.com/api';

// Thunk to fetch pending charities
export const fetchPendingCharities = createAsyncThunk(
  'admin/fetchPendingCharities',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.get(`${API_URL}/admin/charities/pending`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch approved charities
export const fetchApprovedCharities = createAsyncThunk(
  'admin/fetchApprovedCharities',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.get(`${API_URL}/admin/charities/approved`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch rejected charities
export const fetchRejectedCharities = createAsyncThunk(
  'admin/fetchRejectedCharities',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.get(`${API_URL}/admin/charities/rejected`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch all users
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to fetch all donations
export const fetchDonations = createAsyncThunk(
  'admin/fetchDonations',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.get(`${API_URL}/admin/donations`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update charity status (approve/reject)
export const updateCharityStatus = createAsyncThunk(
  'admin/updateCharityStatus',
  async ({ charityId, status }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.put(
        `${API_URL}/admin/approve_charity/${charityId}`,
        { status },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );
      return { charityId, status, message: res.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete a user
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.delete(`${API_URL}/admin/delete_user/${userId}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return { userId, message: res.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete a charity
export const deleteCharity = createAsyncThunk(
  'admin/deleteCharity',
  async (charityId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await axios.delete(`${API_URL}/admin/delete_charity/${charityId}`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
      });
      return { charityId, message: res.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  pendingCharities: [],
  approvedCharities: [],
  rejectedCharities: [],
  users: [],
  donations: [],
  status: 'idle',
  error: null,
  message: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending charities
      .addCase(fetchPendingCharities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPendingCharities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingCharities = action.payload;
      })
      .addCase(fetchPendingCharities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Approved charities
      .addCase(fetchApprovedCharities.fulfilled, (state, action) => {
        state.approvedCharities = action.payload;
      })
      // Rejected charities
      .addCase(fetchRejectedCharities.fulfilled, (state, action) => {
        state.rejectedCharities = action.payload;
      })
      // Users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // Donations
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.donations = action.payload;
      })
      // Update charity status
      .addCase(updateCharityStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.users = state.users.filter((user) => user.id !== action.payload.userId);
      })
      // Delete charity
      .addCase(deleteCharity.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.pendingCharities = state.pendingCharities.filter((c) => c.id !== action.payload.charityId);
        state.approvedCharities = state.approvedCharities.filter((c) => c.id !== action.payload.charityId);
        state.rejectedCharities = state.rejectedCharities.filter((c) => c.id !== action.payload.charityId);
      });
  },
});

export const { clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
