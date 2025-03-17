import { configureStore } from "@reduxjs/toolkit"
import transactionsSlice from "../Store/Slice/transactionsSlice/transactionsSlice"
const store = configureStore({
    reducer:{
        transactionsSlice:transactionsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
