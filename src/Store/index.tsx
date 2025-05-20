import { configureStore } from "@reduxjs/toolkit"
import transactionsSlice from "./Slice/transactionsSlice/transactionsSlice"
import modalTransactionSlice from "./Slice/modalTransaction/modalTransactionSlice"
export const store = configureStore({
    reducer:{
        transactionsSlice:transactionsSlice,
        modalTransactionSlice:modalTransactionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
