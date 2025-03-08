import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    orders: [],
}

const orderSlice = createSlice({
    name: "orders",
    initialState: initialValue,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    }
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer