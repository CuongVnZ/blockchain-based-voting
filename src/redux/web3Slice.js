import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenContract: null,
    votingContract: null,
    instance: null,
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setInstance: (state, action) => {
            state.instance = action.payload
        },
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