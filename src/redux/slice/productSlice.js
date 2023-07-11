import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        STORE_PRODUCTS(state, action) {
            state.products = action.payload.products
        },
        GET_PRICE_RANGE(state, action){
            const { products } = action.payload
            const array = []
            // Create an array out of product prices
            products.forEach(product => {
                const price = product.price

                array.push(price)
            })

            // Set min and max values of array
            const max = Math.max(...array)
            const min = Math.min(...array)

            state.maxPrice = max
            state.minPrice = min
        }
    }
})

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions

export default productSlice.reducer