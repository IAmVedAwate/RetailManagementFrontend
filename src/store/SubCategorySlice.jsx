import { createSlice } from "@reduxjs/toolkit";

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
  },
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

export const { setSubCategories } = subCategorySlice.actions;
export default subCategorySlice.reducer;
