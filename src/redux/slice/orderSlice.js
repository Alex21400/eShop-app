import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderHistory: [],
    totalOrderAmount: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        STORE_ORDERS(state, action) {
            state.orderHistory = action.payload
        },
        CALCULATE_TOTAL_ORDER_AMOUNT(state, action) {
            const array = []

            state.orderHistory.forEach(order => {
                const { orderAmount } = order

                array.push(orderAmount)
            })

            const totalAmount = array.reduce((accumulator, item) => (accumulator += item), 0)
            state.totalOrderAmount = totalAmount
        }
    }
})

export const { STORE_ORDERS, CALCULATE_TOTAL_ORDER_AMOUNT } = orderSlice.actions

export default orderSlice.reducer