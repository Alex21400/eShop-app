import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAdress: {},
    billingAdress: {}
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        SAVE_SHIPPING_ADRESS(state, action) {
            state.shippingAdress = action.payload
            console.log(action.payload)
        },
        SAVE_BILLING_ADRESS(state, action) {
            state.billingAdress = action.payload
            console.log(action.payload)
        }
    }
})

export const { SAVE_SHIPPING_ADRESS, SAVE_BILLING_ADRESS } = checkoutSlice.actions

export default checkoutSlice.reducer