import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null ,
    token : sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null ,
}

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload 
        } ,
        setToken : (state,action)=>{
            state.token = action.payload
        }
    }
})

export const {setToken,setUser} = userSlice.actions ;

export default userSlice.reducer