import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenContract: null,
    votingContract: null,
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setTokenContract: (state, action) => {
            state.tokenContract = action.payload
        },
        setVotingContract: (state, action) => {
            state.votingContract = action.payload
        },
    }
})

export const { setInstance, setTokenContract, setVotingContract } = web3Slice.actions;
export default web3Slice.reducer;