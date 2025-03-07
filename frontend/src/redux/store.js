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
import donationReducer from './donationSlice';
import charityReducer from './charitySlice';
import beneficiaryReducer from './beneficiarySlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    donation: donationReducer,
    charity: charityReducer,
    beneficiaries: beneficiaryReducer,
  },
});

export default store;
