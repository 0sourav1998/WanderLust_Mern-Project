import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggleReview : false 
}

const modifySlice = createSlice({
    name : "modify",
    initialState,
    reducers : {
        setToggleReview : (state,action)=>{
            state.toggleReview = action.payload
        }
    }
})

export const {setToggleReview} = modifySlice.actions ;

export default modifySlice.reducer