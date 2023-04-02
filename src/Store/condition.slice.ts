import { createSlice } from "@reduxjs/toolkit";

interface initialState{
    isLoading:boolean
}

const initialState: initialState = {
    isLoading:true,
}

const condition = createSlice({
    name: "condition",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }  
})

export const {setIsLoading} = condition.actions
export default condition.reducer