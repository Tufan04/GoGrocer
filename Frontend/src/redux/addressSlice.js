import { createSlice } from "@reduxjs/toolkit"

const initailValue = {
    addresses: [],
}

const addressSlice = createSlice({
    name: "address",
    initialState: initailValue,
    reducers: {
        setAddresses: (state, action) => {
            state.addresses = action.payload
        },
    },
})
export const { setAddresses } = addressSlice.actions
export default addressSlice.reducer