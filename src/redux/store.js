import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice'
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        filter: filterSlice,
        cart: cartSlice,
        checkout: checkoutSlice,
        order: orderSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store