import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/user" ;
import modifyReducer from "../slice/modify"

export const rootReducer = combineReducers({
    user : userReducer ,
    modify : modifyReducer
})