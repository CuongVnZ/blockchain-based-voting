import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.address = action.payload
        },
        setUserBalance: (state, action) => {
            state.balance = action.payload
        },
    }
})

export const { setUser, setUserBalance } = authSlice.actions;
export default authSlice.reducer;