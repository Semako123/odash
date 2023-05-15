import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface{
    isLoading: boolean,
    isDark: boolean;
}

const initialState: initialStateInterface = {
    isLoading: true,
    isDark: JSON.parse(localStorage.getItem("spotify_theme")!) || false,
}

const condition = createSlice({
    name: "condition",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },

        setIsDark: (state, action) => {
            localStorage.setItem("spotify_theme", JSON.stringify(action.payload))
            state.isDark = action.payload
        }
    }  
})

export const {setIsLoading, setIsDark} = condition.actions
export default condition.reducer