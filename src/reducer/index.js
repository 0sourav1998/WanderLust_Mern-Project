import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/user" ;

export const rootReducer = combineReducers({
    user : userReducer
})