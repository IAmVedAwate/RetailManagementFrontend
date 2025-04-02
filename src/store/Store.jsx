
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice"
import categorySlice from "./CategorySlice";
import subCategorySlice from "./SubCategorySlice";
import warehouseSlice from "./WarehouseSlice";
import billSlice from "./BillSlice";
import productSlice from "./ProductSlice";
import advertisementSlice from "./AdvertisementSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        categories: categorySlice,
        subCategories: subCategorySlice,
        warehouse: warehouseSlice,
        bills: billSlice,
        products: productSlice,
        advertisements: advertisementSlice,
    }
})