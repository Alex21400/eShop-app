import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: ''
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            const product = action.payload
            const productIndex = state.cartItems.findIndex(item => item.id === product.id)
            
            // Check if product already exists in cartItems
            if(productIndex >= 0){
                // Item is already in the cart
                // Increase the cartQuantity
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${product.name} increased by 1`, {position: 'top-left'})
            }else {
                // Item does not exist in the cart
                // Add item to the cart
                const temporaryProduct = {...product, cartQuantity: 1}
                state.cartItems.push(temporaryProduct)
                toast.success(`Product ${product.name} added to cart`, {position: 'top-left'})
            }
            // Save cart to local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        DECREASE_CART(state, action) {
            const product = action.payload
            const productIndex = state.cartItems.findIndex(item => item.id === product.id)

            if(state.cartItems[productIndex].cartQuantity > 1){
                state.cartItems[productIndex].cartQuantity -= 1
                toast.info(`${product.name} decreased by 1`, {position: 'top-left'})
            }else if(state.cartItems[productIndex].cartQuantity === 1){
                const newCartItems = state.cartItems.filter(item => item.id !== product.id)
                toast.info(`${product.name} removed from cart`, {position: 'top-left'})

                state.cartItems = newCartItems
            }
            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        REMOVE_FROM_CART(state, action) {
            const product = action.payload

            const newCartItems = state.cartItems.filter(item => item.id !== product.id)
            toast.info(`${product.name} remove from cart`, {position: 'top-left'})
            state.cartItems = newCartItems

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state, action){
            state.cartItems = []
            toast.success('All cart items removed', {position: 'top-left'})

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        CALCULATE_SUBTOTAL(state, action) {
            const array = []

            state.cartItems.forEach(item => {
                const { price, cartQuantity } = item

                // Calculate total worth per item and push it into array
                const cartItemAmount = cartQuantity * price
                array.push(cartItemAmount)
            })

            // Calculate the worth of all the items in the array
            const totalAmount = array.reduce((accumulator, item) => (accumulator += item), 0)
            state.cartTotalAmount = totalAmount
        },
        CALCULATE_TOTAL_QUANTITY(state, action) {
            const array = []

            // Calculate amount of each item and push it into array
            state.cartItems.forEach(item => {
                const { cartQuantity } = item
                const quantity = cartQuantity
                array.push(quantity)
            })

            // Calculate the total amount of items from the array
            const totalQuantity = array.reduce((accumulator, item) => (accumulator += item), 0)
            state.cartTotalQuantity = totalQuantity
        },
        SAVE_URL(state, action) {
            state.previousURL = action.payload
        }
    }
})

export const { 
ADD_TO_CART, 
DECREASE_CART, 
REMOVE_FROM_CART, 
CLEAR_CART, 
CALCULATE_SUBTOTAL, 
CALCULATE_TOTAL_QUANTITY,
SAVE_URL } = cartSlice.actions

export default cartSlice.reducer