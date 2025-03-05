import { createSlice } from "@reduxjs/toolkit";

// Initial state for donation
const initialState = {
  selectedCharity: null,
  donationAmount: 0,
  donationFrequency: "one-time", // "one-time" or "recurring"
  anonymous: false,
  paymentMethod: "paypal", // Could also be "stripe"
};

// Redux slice for donation details
const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setCharity: (state, action) => {
      state.selectedCharity = action.payload;
    },
    setDonationAmount: (state, action) => {
      state.donationAmount = action.payload;
    },
    setDonationFrequency: (state, action) => {
      state.donationFrequency = action.payload;
    },
    toggleAnonymous: (state) => {
      state.anonymous = !state.anonymous;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  setCharity,
  setDonationAmount,
  setDonationFrequency,
  toggleAnonymous,
  setPaymentMethod,
} = donationSlice.actions;

export default donationSlice.reducer;
