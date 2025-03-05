// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import charityReducer from "./charitySlice";
// import beneficiaryReducer from "./beneficiarySlice";
// import donationReducer from "./donationSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     charity: charityReducer,
//     beneficiaries: beneficiaryReducer,
//     donation: donationReducer,
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;
