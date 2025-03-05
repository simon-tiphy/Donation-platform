// import { createSlice } from "@reduxjs/toolkit";

// // Load beneficiaries from local storage
// const loadBeneficiaries = () => {
//   const data = localStorage.getItem("beneficiaries");
//   return data ? JSON.parse(data) : [];
// };

// const beneficiarySlice = createSlice({
//   name: "beneficiaries",
//   initialState: {
//     list: loadBeneficiaries(),
//   },
//   reducers: {
//     addBeneficiary: (state, action) => {
//       state.list.push(action.payload);
//       localStorage.setItem("beneficiaries", JSON.stringify(state.list)); // Save to storage
//     },
//   },
// });

// export const { addBeneficiary } = beneficiarySlice.actions;
// export default beneficiarySlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Load beneficiaries from local storage
// const loadBeneficiaries = () => {
//   const data = localStorage.getItem("beneficiaries");
//   return data ? JSON.parse(data) : [];
// };

// // Save beneficiaries to local storage
// const saveBeneficiaries = (beneficiaries) => {
//   localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));
// };

// const beneficiarySlice = createSlice({
//   name: "beneficiaries",
//   initialState: {
//     list: loadBeneficiaries(),
//   },
//   reducers: {
//     addBeneficiary: (state, action) => {
//       state.list.push({ ...action.payload, inventory: [] }); // Initialize inventory as empty array
//       saveBeneficiaries(state.list);
//     },
//     addInventoryItem: (state, action) => {
//       const { beneficiaryId, item } = action.payload;
//       const beneficiary = state.list.find((b) => b.id === beneficiaryId);
//       if (beneficiary) {
//         beneficiary.inventory.push(item);
//         saveBeneficiaries(state.list);
//       }
//     },
//     updateInventoryItem: (state, action) => {
//       const { beneficiaryId, itemId, updatedItem } = action.payload;
//       const beneficiary = state.list.find((b) => b.id === beneficiaryId);
//       if (beneficiary) {
//         const itemIndex = beneficiary.inventory.findIndex((i) => i.id === itemId);
//         if (itemIndex !== -1) {
//           beneficiary.inventory[itemIndex] = updatedItem;
//           saveBeneficiaries(state.list);
//         }
//       }
//     },
//     removeInventoryItem: (state, action) => {
//       const { beneficiaryId, itemId } = action.payload;
//       const beneficiary = state.list.find((b) => b.id === beneficiaryId);
//       if (beneficiary) {
//         beneficiary.inventory = beneficiary.inventory.filter((i) => i.id !== itemId);
//         saveBeneficiaries(state.list);
//       }
//     },
//   },
// });

// export const { addBeneficiary, addInventoryItem, updateInventoryItem, removeInventoryItem } = beneficiarySlice.actions;
// export default beneficiarySlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const loadBeneficiaries = () => {
  const data = localStorage.getItem("beneficiaries");
  return data ? JSON.parse(data) : [];
};

const beneficiarySlice = createSlice({
  name: "beneficiaries",
  initialState: {
    list: loadBeneficiaries(),
  },
  reducers: {
    addBeneficiary: (state, action) => {
      state.list.push({ ...action.payload, id: Date.now(), inventory: [] }); // Ensure each beneficiary has an inventory
      localStorage.setItem("beneficiaries", JSON.stringify(state.list));
    },

    addInventoryItem: (state, action) => {
      const { beneficiaryId, item } = action.payload;
      const beneficiary = state.list.find((b) => b.id === beneficiaryId);

      if (beneficiary) {
        if (!beneficiary.inventory) beneficiary.inventory = []; // Ensure inventory exists
        beneficiary.inventory.push(item);
        localStorage.setItem("beneficiaries", JSON.stringify(state.list));
      }
    },

    removeInventoryItem: (state, action) => {
      const { beneficiaryId, itemId } = action.payload;
      const beneficiary = state.list.find((b) => b.id === beneficiaryId);

      if (beneficiary && beneficiary.inventory) {
        beneficiary.inventory = beneficiary.inventory.filter((_, index) => index !== itemId);
        localStorage.setItem("beneficiaries", JSON.stringify(state.list));
      }
    },

    removeBeneficiary: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
      localStorage.setItem("beneficiaries", JSON.stringify(state.list));
    },
  },
});

export const { addBeneficiary, addInventoryItem, removeInventoryItem, removeBeneficiary } =
  beneficiarySlice.actions;
export default beneficiarySlice.reducer;
