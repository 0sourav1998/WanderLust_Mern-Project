import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null ,
    image : sessionStorage.getItem("image") ? JSON.parse(sessionStorage.getItem("image")) : null ,
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
        } ,
        setImage : (state,action)=>{
            state.image = action.payload
        }
    }
})

export const {setToken,setUser,setImage} = userSlice.actions ;

export default userSlice.reducer