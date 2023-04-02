import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user.slice"
import conditionReducer from "./condition.slice"

const store = configureStore({
    reducer: {
        user: userReducer,
        conditions:conditionReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>