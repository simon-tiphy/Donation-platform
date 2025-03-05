// import { createSlice } from "@reduxjs/toolkit";

// // Load users from local storage
// const loadUsers = () => {
//   const users = localStorage.getItem("users");
//   return users ? JSON.parse(users) : [];
// };

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   users: loadUsers(),
//   status: "idle",
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     registerUser: (state, action) => {
//       const { name, email, password, role } = action.payload;

//       const existingUser = state.users.find((user) => user.email === email);
//       if (existingUser) {
//         state.error = "User with this email already exists!";
//         return;
//       }

//       const newUser = {
//         name,
//         email,
//         password,
//         role,
//         approved: role === "charity" ? false : true, // Default approval status
//       };

//       state.users.push(newUser);
//       localStorage.setItem("users", JSON.stringify(state.users));

//       state.status = "succeeded";
//       state.error = null;
//     },
//     loginUser: (state, action) => {
//       const { email, password } = action.payload;
//       const user = state.users.find((u) => u.email === email && u.password === password);

//       if (user) {
//         if (user.role === "charity" && !user.approved) {
//           state.error = "Your account is pending approval.";
//           return;
//         }

//         state.user = user;
//         localStorage.setItem("user", JSON.stringify(user));
//         state.error = null;
//       } else {
//         state.error = "Invalid email or password!";
//       }
//     },
//     approveCharity: (state, action) => {
//       const { email } = action.payload;
//       const user = state.users.find((u) => u.email === email && u.role === "charity");
//       if (user) {
//         user.approved = true;
//         localStorage.setItem("users", JSON.stringify(state.users));
//       }
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { registerUser, loginUser, approveCharity, logout } = authSlice.actions;
// export default authSlice.reducer;


// src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://donation-platform-8n9f.onrender.com/api/auth";

// // Async Thunk for Register
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, userData);
//       return response.data; // Return user data (including role & status)
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// // Async Thunk for Login
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, credentials);
//       const user = response.data;

//       // If charity is not approved, reject login
//       if (user.role === "charity" && user.status !== "approved") {
//         return rejectWithValue("Your account is pending approval. Please wait for admin approval.");
//       }

//       // Store token in localStorage
//       localStorage.setItem("token", user.token);
//       localStorage.setItem("role", user.role);
//       return user;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: localStorage.getItem("token") || null,
//     role: localStorage.getItem("role") || null,
//     error: null,
//     loading: false,
//   },
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       state.user = null;
//       state.token = null;
//       state.role = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.token = action.payload.token;
//         state.role = action.payload.role;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "https://donation-platform-8n9f.onrender.com/api/auth";

// 🔹 Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // User registered successfully
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// 🔹 Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const user = response.data;

      // Prevent login if a charity is not approved
      if (user.role === "charity" && user.status !== "approved") {
        return rejectWithValue("Your charity account is pending approval.");
      }

      // Store token & role in localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 Logout User
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  dispatch(authSlice.actions.logout());
};

// 🔹 Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
