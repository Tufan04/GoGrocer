import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cartProducts: [],
    allTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialValue,
    reducers: {
        setCartProducts: (state, action) => {
            state.cartProducts = [...action.payload];
        },
        setAllTotalAmount: (state, action) => {
            state.allTotalAmount = action.payload;
        }
    }
})

export const { setCartProducts, setAllTotalAmount } = cartSlice.actions
export default cartSlice.reducer