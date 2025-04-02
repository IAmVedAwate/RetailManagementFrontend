import { createSlice } from "@reduxjs/toolkit";

const WarehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: [],
  },
  reducers: {
    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    removeWarehouseItem: (state, action) => {
      // Filter out the item by ID
      state.warehouse = state.warehouse.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setWarehouse, removeWarehouseItem } = WarehouseSlice.actions;
export default WarehouseSlice.reducer;
