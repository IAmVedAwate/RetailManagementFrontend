import { createSlice } from "@reduxjs/toolkit";

const BillSlice = createSlice({
  name: "bills",
  initialState: {
    bills: [],
  },
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
    },
  },
});

export const { setBills } = BillSlice.actions;
export default BillSlice.reducer;
