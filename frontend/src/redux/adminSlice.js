// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchUsers,
//   fetchPendingCharities,
//   updateCharityStatus,
//   updateUserStatus,
//   deleteUser,
//   deleteCharity,
//   fetchDonations,
// } from "../api/adminApi";

// // ✅ Fetch all users (includes charity users)
// export const getUsers = createAsyncThunk("admin/getUsers", async () => {
//   return await fetchUsers();
// });

// // ✅ Fetch all pending charities
// export const getPendingCharities = createAsyncThunk("admin/getPendingCharities", async () => {
//   return await fetchPendingCharities();
// });

// // ✅ Approve/Reject a charity
// export const changeCharityStatus = createAsyncThunk("admin/changeCharityStatus", async ({ charityId, status }) => {
//   return await updateCharityStatus(charityId, status);
// });

// // ✅ Approve/Reject a charity user
// export const approveCharityUser = createAsyncThunk("admin/approveCharityUser", async ({ userId, status }) => {
//   return await updateUserStatus(userId, status);
// });

// // ✅ Delete a user
// export const removeUser = createAsyncThunk("admin/removeUser", async (userId) => {
//   return await deleteUser(userId);
// });

// // ✅ Delete a charity
// export const removeCharity = createAsyncThunk("admin/removeCharity", async (charityId) => {
//   return await deleteCharity(charityId);
// });

// // ✅ Fetch all donations
// export const getDonations = createAsyncThunk("admin/getDonations", async () => {
//   return await fetchDonations();
// });

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     users: [],
//     pendingCharities: [],
//     donations: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUsers.fulfilled, (state, action) => { state.users = action.payload; })
//       .addCase(getPendingCharities.fulfilled, (state, action) => { state.pendingCharities = action.payload; })
//       .addCase(getDonations.fulfilled, (state, action) => { state.donations = action.payload; })
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => { state.loading = true; state.error = null; }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => { state.loading = false; state.error = action.error.message; }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/fulfilled"),
//         (state) => { state.loading = false; }
//       );
//   },
// });

// export default adminSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchPendingCharities,
  updateCharityStatus,
  updateUserStatus,
  deleteUser,
  deleteCharity,
  fetchDonations,
} from "../api/adminApi";

// ✅ Fetch all users
export const getUsers = createAsyncThunk("admin/getUsers", async () => {
  return await fetchUsers();
});

// ✅ Fetch all pending charities
export const getPendingCharities = createAsyncThunk("admin/getPendingCharities", async () => {
  return await fetchPendingCharities();
});

// ✅ Approve/Reject a charity
export const changeCharityStatus = createAsyncThunk("admin/changeCharityStatus", async ({ charityId, status }) => {
  return await updateCharityStatus(charityId, status);
});

// ✅ Approve/Reject a charity user
export const approveCharityUser = createAsyncThunk("admin/approveCharityUser", async ({ userId, status }) => {
  return await updateUserStatus(userId, status);
});

// ✅ Delete a user
export const removeUser = createAsyncThunk("admin/removeUser", async (userId) => {
  return await deleteUser(userId);
});

// ✅ Delete a charity
export const removeCharity = createAsyncThunk("admin/removeCharity", async (charityId) => {
  return await deleteCharity(charityId);
});

// ✅ Fetch all donations
export const getDonations = createAsyncThunk("admin/getDonations", async () => {
  return await fetchDonations();
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    pendingCharities: [],
    donations: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getPendingCharities.fulfilled, (state, action) => {
        state.pendingCharities = action.payload;
      })
      .addCase(getDonations.fulfilled, (state, action) => {
        state.donations = action.payload;
      })
      .addCase(changeCharityStatus.fulfilled, (state, action) => {
        const { charityId, status } = action.meta.arg;
        // Remove charity from pending list after approval/rejection
        state.pendingCharities = state.pendingCharities.filter(charity => charity.id !== charityId);
        // If approved, add it to the users list
        if (status === "approved") {
          state.users.push({ ...action.payload, role: "charity", status });
        }
      })
      .addCase(approveCharityUser.fulfilled, (state, action) => {
        const { userId, status } = action.meta.arg;
        // Update user status in state without refreshing
        state.users = state.users.map(user =>
          user.id === userId ? { ...user, status } : user
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default adminSlice.reducer;
