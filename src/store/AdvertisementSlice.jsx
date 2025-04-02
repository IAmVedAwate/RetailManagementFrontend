import { createSlice } from "@reduxjs/toolkit";

const advertisementSlice = createSlice({
  name: "advertisements",
  initialState: {
    advertisements: [],
  },
  reducers: {
    setAdvertisements: (state, action) => {
      state.advertisements = action.payload;
    },
  },
});

export const { setAdvertisements } = advertisementSlice.actions;
export default advertisementSlice.reducer;
