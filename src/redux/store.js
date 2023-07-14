import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import web3Slice from "./web3Slice";

const rootReducer = combineReducers({ user: authSlice, web3: web3Slice });

export const store = configureStore({
  reducer: rootReducer
})