import { createSlice } from "@reduxjs/toolkit";

// Load charity data from local storage (if available)
const loadCharityData = () => {
  const data = localStorage.getItem("charityData");
  return data ? JSON.parse(data) : { beneficiaries: [], donations: [], reports: [] };
};

const initialState = loadCharityData();

const charitySlice = createSlice({
  name: "charity",
  initialState,
  reducers: {
    addBeneficiary: (state, action) => {
      state.beneficiaries.push(action.payload);
      localStorage.setItem("charityData", JSON.stringify(state));
    },
    addDonation: (state, action) => {
      state.donations.push(action.payload);
      localStorage.setItem("charityData", JSON.stringify(state));
    },
    addReport: (state, action) => {
      state.reports.push(action.payload);
      localStorage.setItem("charityData", JSON.stringify(state));
    },
  },
});

export const { addBeneficiary, addDonation, addReport } = charitySlice.actions;
export default charitySlice.reducer;
